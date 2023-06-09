const accountModel = require("../models/account.model");
const customerModel = require("../models/customer.model");
const employeeModel = require("../models/employee.model");
const otpModel = require("../models/otp.model");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair, verifyToken } = require("../auth/authUtils");
const { sendMail, templateMailSendOTP, generatePassword ,templateMailSendPassword} = require("../utils");

class AccountService {
  static getAccountById = async (id) => {
    try {
      const area = await accountModel.findOne({ _id: id });
      return {
        code: 200,
        metadata: {
          success: true,
          data: area,
        },
      };
    } catch (err) {
      return {
        code: 500,
        metadata: {
          success: false,
          message: err.message,
          status: "get account error",
        },
      };
    }
  };
  static signUp = async ({ Email, MatKhau, LoaiTaiKhoan, TrangThai }) => {
    try {
      //check exist
      //hàm lean trả về 1 obj thuần túy
      const account = await accountModel.findOne({ Email }).lean();
      if (account) {
        if (account.XacThuc) {
          return {
            code: 300,
            metadata: {
              success: false,
              message: "Email đã được đăng ký",
            },
          };
        }
        return {
          code: 300,
          metadata: {
            success: false,
            message: "Email đã được đăng ký , đăng nhập để xác thưc",
          },
        };
      }

      const passwordHash = await bcrypt.hash(MatKhau, 10);
      const newAccount = await accountModel.create({
        Email,
        MatKhau: passwordHash,
        LoaiTaiKhoan,
        TrangThai,
      });
      if (newAccount) {
        //tạo private key và public key
        // const { privateKey , publicKey } = crypto.generateKeyPairSync('rsa', {
        //     modulusLength: 4096,
        //     publicKeyEncoding:{
        //         type: 'pkcs1',
        //         format: 'pem'
        //     },
        //     privateKeyEncoding:{
        //         type: 'pkcs1',
        //         format: 'pem'
        //     }
        // })

        //Tạo khánh hàng
        const newCustomer = await customerModel.create({
          Email,
          MaTaiKhoan: newAccount._id,
        });

        //Xác thực

        //Random OTP
        const OTP = Math.floor(Math.random() * 9000 + 1000) + "";

        //Gửi mail
        let subject = "Verify Account";
        let mail = Email;
        let html = templateMailSendOTP(OTP);

        let check = sendMail(mail, subject, html);
        //Lưu OTP
        const otpHash = await bcrypt.hash(OTP, 10);
        const newOTP = await otpModel.create({
          Email,
          OTP: otpHash,
        });

        return {
          code: 201,
          metadata: {
            success: true,
            verifyOTP: true,
            account: newAccount,
            message: "Tài khoản đã được tạo, vui lòng xác thực email",
          },
        };
      }
      return {
        code: 200,
        metadata: null,
      };
    } catch (err) {
      return {
        code: 500,
        metadata: {
          success: false,
          message: err.message,
          status: "add account error",
        },
      };
    }
  };

  static signIn = async ({ Email, MatKhau }) => {
    const account = await accountModel.findOne({ Email }).lean();
    if (!account)
      return {
        code: 500,
        metadata: {
          message: "Không tìm thấy tài khoản",
        },
      };

    if (!account.XacThuc) {
      //Xác thực

      //Random OTP
      const OTP = Math.floor(Math.random() * 9000 + 1000) + "";

      //Gửi mail
      let subject = "Verify Account";
      let mail = Email;
      let html = templateMailSendOTP(OTP);

      let check = sendMail(mail, subject, html);
      //Lưu OTP
      const otpHash = await bcrypt.hash(OTP, 10);
      const newOTP = await otpModel.create({
        Email,
        OTP: otpHash,
      });

      return {
        code: 200,
        metadata: {
          verifyOTP: true,
          message: "Đang đợi xác thực",
        },
      };
    }

    const match = await bcrypt.compare(MatKhau, account.MatKhau);

    if (!match) {
      return {
        code: 500,
        metadata: {
          success: false,
          message: "Mật khẩu không chính xác",
        },
      };
    }

    const privateKey = process.env.KEY_PRIVATE;
    const publicKey = process.env.KEY_PUBLIC;

    const tokens = await createTokenPair(
      { userId: account._id, Email },
      publicKey,
      privateKey
    );

    await KeyTokenService.createKeyToken({
      privateKey,
      publicKey,
      refreshToken: tokens.refreshToken,
      userId: account._id,
    });

    return {
      code: 200,
      metadata: {
        success: true,
        account: account,
        tokens,
      },
    };
  };

  static getAccountCustomerByAccessToken = async ({ AccessToken }) => {
    if (!AccessToken) {
      return {
        code: 404,
        metadata: {
          success: false,
          message: "token null",
        },
      };
    }
    const publicKey = process.env.KEY_PUBLIC;
    try {
      const decode = await JWT.verify(AccessToken.toString(), publicKey);
      if (decode) {
        const account = await accountModel
          .findOne({ _id: decode.userId })
          .select("-MatKhau")
          .lean().exec()

        let customer
        if(account.LoaiTaiKhoan === 0) {
          customer = await customerModel
          .findOne({ MaTaiKhoan: decode.userId })
          .lean();
        }else{
          customer = await employeeModel
          .findOne({ MaTaiKhoan: decode.userId })
          .lean();
        }
        

        return {
          code: 200,
          metadata: {
            success: true,
            data: {
              account,
              customer,
            },
          },
        };
      }
    } catch (error) {
      return {
        code: 500,
        metadata: {
          success: false,
          message: error.message,
        },
      };
    }
  };

  static verifyOtp = async ({ Email, OTP }) => {
    try {
      const getotp = await otpModel.find({ Email });
      if (!getotp.length) {
        return {
          code: 404,
          metadata: {
            success: false,
            message: "OTP hết hạn",
          },
        };
      }
      const otpLast = getotp[getotp.length - 1];
      const otpValid = await bcrypt.compare(OTP, otpLast.OTP);

      if (!otpValid)
        return {
          code: 400,
          metadata: {
            success: false,
            message: "OTP không chính xác",
          },
        };

      //update
      const userUpdate = await accountModel.findOneAndUpdate(
        { Email },
        {
          $set: { XacThuc: true },
        },
        { new: true }
      );

      //tạo tokens
      const privateKey = process.env.KEY_PRIVATE;
      const publicKey = process.env.KEY_PUBLIC;

      const tokens = await createTokenPair(
        { userId: userUpdate._id, Email },
        publicKey,
        privateKey
      );

      await KeyTokenService.createKeyToken({
        privateKey,
        publicKey,
        refreshToken: tokens.refreshToken,
        userId: userUpdate._id,
      });

      return {
        code: 200,
        metadata: {
          success: true,
          message: "Xác thực thành công",
          account: userUpdate,
          tokens,
        },
      };
    } catch (error) {
      return {
        code: 500,
        metadata: {
          success: false,
          message: err.message,
          status: "Vertify OTP failed",
        },
      };
    }
  };
  static sendOtp = async ({ Email }) => {
    try {
      //Xác thực

      //Random OTP
      const OTP = Math.floor(Math.random() * 9000 + 1000) + "";

      //Gửi mail
      let subject = "Verify Account";
      let mail = Email;
      let html = templateMailSendOTP(OTP);

      let check = sendMail(mail, subject, html);
      //Lưu OTP
      const otpHash = await bcrypt.hash(OTP, 10);
      const newOTP = await otpModel.create({
        Email,
        OTP: otpHash,
      });
      if (newOTP) {
        return {
          code: 200,
          metadata: {
            success: true,
            message: "Gửi OTP thành công",
          },
        };
      }

      return {
        code: 200,
        metadata: {
          success: false,
          message: "Gửi OTP thất bại",
        },
      };
    } catch (error) {
      return {
        code: 500,
        metadata: {
          success: false,
          message: err.message,
          status: "Send OTP failed",
        },
      };
    }
  };

  static verifyForgetPassword = async ({ Email, OTP }) => {
    try {
      const getotp = await otpModel.find({ Email });
      if (!getotp.length) {
        return {
          code: 404,
          metadata: {
            success: false,
            message: "OTP hết hạn",
          },
        };
      }
      const otpLast = getotp[getotp.length - 1];
      const otpValid = await bcrypt.compare(OTP, otpLast.OTP);

      if (!otpValid)
        return {
          code: 400,
          metadata: {
            success: false,
            message: "OTP không chính xác",
          },
        };

      //update
      const newPW = generatePassword(8);
      let subject = "Mật khẩu mới";
      let mail = Email;
      let html = templateMailSendPassword(newPW);
      let check = sendMail(mail, subject, html);

      const passwordHash = await bcrypt.hash(newPW, 10);
      const userUpdate = await accountModel.findOneAndUpdate(
        { Email },
        {
          $set: { MatKhau: passwordHash },
        },
        { new: true }
      );

      return {
        code: 200,
        metadata: {
          success: true,
          message: "Kiểm tra mail để nhận mật khẩu mới",
        },
      };
    } catch (error) {
      return {
        code: 500,
        metadata: {
          success: false,
          message: error.message,
          status: "failed",
        },
      };
    }
  };

  static changePassword = async ({ Email, MatKhauCu , MatKhauMoi }) => {
    try {
      const account = await accountModel.findOne({ Email }).lean();
      if (!account) {
        return {
          code: 404,
          metadata: {
            success: false,
            message: "Không tìm thấy tài khoản",
          },
        };
      }
      const pwValid = await bcrypt.compare(MatKhauCu, account.MatKhau);

      if (!pwValid)
        return {
          code: 400,
          metadata: {
            success: false,
            message: "Mật khẩu cũ không chính xác",
          },
        };

      //update
      const passwordHash = await bcrypt.hash(MatKhauMoi, 10);
      const userUpdate = await accountModel.findOneAndUpdate(
        { Email },
        {
          $set: { MatKhau: passwordHash },
        },
        { new: true }
      );

      if(userUpdate){
        return {
          code: 200,
          metadata: {
            success: true,
            message: "Đổi mật khẩu thành công",
         
          },
        };
      }
      return {
        code: 400,
        metadata: {
          success: false,
          message: "Đổi mật khẩu thất bại",
       
        },
      };
      
    } catch (error) {
      return {
        code: 500,
        metadata: {
          success: false,
          message: err.message,
          status: "Đổi mật khẩu thất bại",
        },
      };
    }
  };
}

module.exports = AccountService;
