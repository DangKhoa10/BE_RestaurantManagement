const _ = require('lodash')
const transport = require('../config/config.mail')
 

const getInfoData = ({ fileds = [], object = {}})=>{
    return _.pick(object, fileds)
}

const generatePassword = (length) => {
    let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let password = "";
    for (let i = 0; i < length; i++) {
      password += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return password;
  };


const sendMail = (mailTo , subject , html) =>{
    transport.sendMail({
        from: process.env.GMAIL,
        to: mailTo,
        subject: subject,
        html: html
    }, function(err, info){
        if (err) {
            console.log(err);
            return false;
        } else {
            return true;
        }
    })
}

const convertDate = (mongoDate) => {
    const date = new Date(mongoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    return `${hour} giờ ${minute} phút ${day}-${month}-${year}`;
  }

  const convertToVND = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

const templateMailSendOTP = (OTP) =>{
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Xác thực tài khoản</title>
        <style>
            *{
                padding: 0;
                margin: 0;
                box-sizing: border-box;
            }
            html{
                font-family: 'Roboto' !important;
                font-style: normal;
            }
            .page{
                min-width: 100%;
                width: 100%;
                display: flex;
                justify-content: center;
                background-color: #f3f3f3;
            }
            .change-password{
                font-family: 'Google Sans';
                margin: 0 auto;
                width: 500px;
                background: #FFFFFF;
                border-radius: 10px;
                padding: 20px;
            }
            .body{
                padding: 15px 20px 30px;
    
            }
            .logo{
                width: 120px;
                height: 120px;
            }
            .logo img{
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
            .title{
                font-weight: 600;
                font-size: 20px;
                line-height: 25px;
                color: #000000;
            }
            .mt-70{
                margin-top: 70px;
            }
            .mt-20{
                margin-top: 20px;
            }
            .mt-30{
                margin-top: 30px;
            }
            .mt-10{
                margin-top: 10px;
            }
            .mb-10{
                margin-bottom: 10px;
            }
            .mt-6{
                margin-top: 6px;
            }
            .mt-4{
                margin-top: 4px;
            }
            .mt-25{
                margin-top: 25px;
            }
            .text{
                font-weight: 400;
                font-size: 14px;
                line-height: 18px;
                color: #444444;
            }
            .fz-20{
                font-size: 20px;
            }
            .font-otp{
                font-weight: 600 !important;
                font-size: 30px;
                letter-spacing: 5px;
            }
            .text.active{
                font-weight: 500;
                color: #F8993F;
            }
            .text-right{
                text-align: right;
            }
        </style>
    </head>
    <body>
        <div class="page">
            <div class="change-password">
                <div class="body">
                    <div class="logo">
                        <img src="https://res.cloudinary.com/dbar5movy/image/upload/v1680460830/RestaurantManagement/htsdibuokd0tjt5mz3zj.png"/>          
                    </div>
                    <div class="title">
                        Xác thực tài khoản
                    </div>
                    <div class="mt-20">
                        <div>
                            <span class="text">Xin chào</span>
                            <span class="text active"></span>
                       </div>
                        <div>
                            <span class="text">Mã xác thực của bạn là:</span>
                        </div>
                        <div class="mt-10 mb-10">
                            <span class="text active font-otp">${OTP}</span>
                        </div>
                        <div>
                            <span class="text">Không cung cấp mã này cho bất kì ai để bảo vệ tài khoản của bạn</span>
                        </div>
                    </div>
                        
                    <div class="mt-20">
                        <div class="text mt-10">Cảm ơn bạn đã đến với chúng tôi.</div>
                    </div>
                    <div class="mt-20">
                        <div class="text active text-right mt-10">Evergreen Garden</div>
                    </div>
                    
                   
                </div>
               
            </div>
        </div>
    </body>
    </html>`
    return html
}
const templateMailSendPassword = (PW) =>{
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            *{
                padding: 0;
                margin: 0;
                box-sizing: border-box;
            }
            html{
                font-family: 'Roboto' !important;
                font-style: normal;
            }
            .page{
                min-width: 100%;
                width: 100%;
                display: flex;
                justify-content: center;
                background-color: #f3f3f3;
            }
            .change-password{
                font-family: 'Google Sans';
                margin: 0 auto;
                width: 500px;
                background: #FFFFFF;
                border-radius: 10px;
                padding: 20px;
            }
            .body{
                padding: 15px 20px 30px;
    
            }
            .logo{
                width: 120px;
                height: 120px;
            }
            .logo img{
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
            .title{
                font-weight: 600;
                font-size: 20px;
                line-height: 25px;
                color: #000000;
            }
            .mt-70{
                margin-top: 70px;
            }
            .mt-20{
                margin-top: 20px;
            }
            .mt-30{
                margin-top: 30px;
            }
            .mt-10{
                margin-top: 10px;
            }
            .mb-10{
                margin-bottom: 10px;
            }
            .mt-6{
                margin-top: 6px;
            }
            .mt-4{
                margin-top: 4px;
            }
            .mt-25{
                margin-top: 25px;
            }
            .text{
                font-weight: 400;
                font-size: 14px;
                line-height: 18px;
                color: #444444;
            }
            .fz-20{
                font-size: 20px;
            }
            .font-otp{
                font-weight: 600 !important;
                font-size: 30px;
                letter-spacing: 5px;
            }
            .text.active{
                font-weight: 500;
                color: #F8993F;
            }
            .text-right{
                text-align: right;
            }
        </style>
    </head>
    <body>
        <div class="page">
            <div class="change-password">
                <div class="body">
                    <div class="logo">
                        <img src="https://res.cloudinary.com/dbar5movy/image/upload/v1680460830/RestaurantManagement/htsdibuokd0tjt5mz3zj.png"/>          
                    </div>
                    <div class="title">
                        Xác thực tài khoản
                    </div>
                    <div class="mt-20">
                        <div>
                            <span class="text">Xin chào</span>
                            <span class="text active"></span>
                       </div>
                        <div>
                            <span class="text">Mật khẩu mới của bạn là:</span>
                        </div>
                        <div class="mt-10 mb-10">
                            <span class="text active font-otp">${PW}</span>
                        </div>
                        <div>
                            <span class="text">Không cung cấp mật khẩu cho bất kì ai để bảo vệ tài khoản của bạn</span>
                        </div>
                        <div>
                            <span class="text">Sau khi đăng nhập lại ứng dụng thì bạn hãy đổi lại mật khẩu mới nhé</span>
                        </div>
                    </div>
                        
                    <div class="mt-20">
                        <div class="text mt-10">Cảm ơn bạn.</div>
                    </div>
                    <div class="mt-20">
                        <div class="text active text-right mt-10">Evergreen Garden</div>
                    </div>
                    
                   
                </div>
               
            </div>
        </div>
    </body>
    </html>`
    return html
}

const templateMailSendOrder = (LoaiPhieuDat , HoTen) =>{
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title></title>
        <style>
            *{
                padding: 0;
                margin: 0;
                box-sizing: border-box;
            }
            html{
                font-style: normal;
            }
            .page{
                min-width: 100%;
                width: 100%;
                display: flex;
                justify-content: center;
                background-color: #f3f3f3;
            }
            .change-password{
                font-family: 'Google Sans';
                margin: 0 auto;
                width: 500px;
                background: #FFFFFF;
                border-radius: 10px;
                padding: 20px;
            }
            .body{
                padding: 15px 20px 30px;
    
            }
            .logo{
                width: 120px;
                height: 120px;
            }
            .logo img{
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
            .title{
                font-weight: 600;
                font-size: 20px;
                line-height: 25px;
                color: #000000;
            }
            .mt-70{
                margin-top: 70px;
            }
            .mt-20{
                margin-top: 20px;
            }
            .mt-30{
                margin-top: 30px;
            }
            .mt-10{
                margin-top: 10px;
            }
            .mb-10{
                margin-bottom: 10px;
            }
            .mt-6{
                margin-top: 6px;
            }
            .mt-4{
                margin-top: 4px;
            }
            .mt-25{
                margin-top: 25px;
            }
            .text{
                font-weight: 400;
                font-size: 14px;
                line-height: 18px;
                color: #444444;
            }
            .fz-20{
                font-size: 20px;
            }
            .font-otp{
                font-weight: 600 !important;
                font-size: 30px;
                letter-spacing: 5px;
            }
            .text.active{
                font-weight: 500;
                color: #F8993F;
            }
            .text-right{
                text-align: right;
            }
        </style>
    </head>
    <body>
        <div class="page">
            <div class="change-password">
                <div class="body">
                    <div class="logo">
                        <img src="https://res.cloudinary.com/dbar5movy/image/upload/v1680460830/RestaurantManagement/htsdibuokd0tjt5mz3zj.png"/>          
                    </div>
                    <div class="title">
                        Đơn đặt ${LoaiPhieuDat === 0 ? "bàn" : LoaiPhieuDat === 1 ? "phòng" : "phòng vip"} của bạn đã được gửi
                    </div>
                    <div class="mt-20">
                        <div>
                            <span class="text">Xin chào</span>
                            <span class="text active">${HoTen}</span>
                       </div>
                        <div>
                            <span class="text">Chúng tôi đã nhận được yêu cầu đặt ${LoaiPhieuDat === 0 ? "bàn" : LoaiPhieuDat === 1 ? "phòng" : "phòng vip"} từ bạn</span>
                        </div>
                        <div>
                            <span class="text">Chúng tôi sẽ liên lạc với bạn trong thời gian sớm nhất</span>
                        </div>
                        <div>
                            <span class="text">Chờ phản hồi từ chúng tôi nhé!!!</span>
                        </div>
                    </div>
                        
                    <div class="mt-20">
                        <div class="text mt-10">Cảm ơn bạn đã đến với chúng tôi.</div>
                    </div>
                    <div class="mt-20">
                        <div class="text active text-right mt-10">Evergreen Garden</div>
                    </div>
                    
                   
                </div>
               
            </div>
        </div>
    </body>
    </html>`
    return html
}

const templateMailConfirmOrder = ({LoaiPhieuDat , HoTen , TienMonAn, SoPhong ,TienDatPhong}) =>{
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            *{
                padding: 0;
                margin: 0;
                box-sizing: border-box;
            }
            html{
                font-style: normal;
            }
            .page{
                min-width: 100%;
                width: 100%;
                display: flex;
                justify-content: center;
                background-color: #f3f3f3;
            }
            .change-password{
                font-family: 'Google Sans';
                margin: 0 auto;
                width: 500px;
                background: #FFFFFF;
                border-radius: 10px;
                padding: 20px;
            }
            .body{
                padding: 15px 20px 30px;
    
            }
            .logo{
                width: 120px;
                height: 120px;
            }
            .logo img{
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
            .title{
                font-weight: 600;
                font-size: 20px;
                line-height: 25px;
                color: #000000;
            }
            .mt-70{
                margin-top: 70px;
            }
            .mt-20{
                margin-top: 20px;
            }
            .mt-30{
                margin-top: 30px;
            }
            .mt-10{
                margin-top: 10px;
            }
            .mb-10{
                margin-bottom: 10px;
            }
            .mt-6{
                margin-top: 6px;
            }
            .mt-4{
                margin-top: 4px;
            }
            .mt-25{
                margin-top: 25px;
            }
            .text{
                font-weight: 400;
                font-size: 14px;
                line-height: 18px;
                color: #444444;
            }
            .fz-20{
                font-size: 20px;
            }
            .font-otp{
                font-weight: 600 !important;
                font-size: 30px;
                letter-spacing: 5px;
            }
            .text.active{
                font-weight: 500;
                color: #F8993F;
            }
            .text-right{
                text-align: right;
            }
        </style>
    </head>
    <body>
        <div class="page">
            <div class="change-password">
                <div class="body">
                    <div class="logo">
                        <img src="https://res.cloudinary.com/dbar5movy/image/upload/v1680460830/RestaurantManagement/htsdibuokd0tjt5mz3zj.png"/>          
                    </div>
                    <div class="title">
                        Xác nhận đơn đặt ${LoaiPhieuDat === 0 ? "bàn" : LoaiPhieuDat === 1 ? "phòng" : "phòng vip"} thành công
                    </div>
                    <div class="mt-20">
                        <div>
                            <span class="text">Xin chào</span>
                            <span class="text active">${HoTen}</span>
                       </div>
                        <div>
                            <span class="text">Đơn đặt ${LoaiPhieuDat === 0 ? "bàn" : LoaiPhieuDat === 1 ? "phòng" : "phòng vip"} của bạn đã được chúng tôi xác nhận</span>
                        </div>
                        
                        <div>
                            <span class="text">
                            ${LoaiPhieuDat === 0 ?  "Đối với đơn đặt bàn , bạn không cần phải đặt cọc tiền giữ bàn , tuy nhiên bạn cần phải thanh toán 30% tổng giá trị món ăn đã đặt trước nếu có": ""}
                            ${LoaiPhieuDat === 1 ?  "Đối với đơn đặt phòng thường , bạn cần phải đặt cọc tiền giữ phòng với 50.000đ trên mỗi phòng và 30% tổng giá trị món ăn đã đặt trước nếu có" : ""}
                            ${LoaiPhieuDat === 2 ?  "Đối với đơn đặt phòng VIP , bạn cần phải đặt cọc tiền giữ phòng với 100.000đ trên mỗi phòng và 30% tổng giá trị món ăn đã đặt trước nếu có" : ""}
                            </span>
                        </div>
                        <div>
                            <span class="text">
                            ${(LoaiPhieuDat === 1 || LoaiPhieuDat === 2) ?  `Tiền đặt ${SoPhong} phòng: ${convertToVND(TienDatPhong)} ` : ""}
                            </span>
                        </div>
                        <div>
                            <span class="text">
                                30% tổng giá trị món ăn: ${convertToVND(TienMonAn)}
                            </span>
                        </div>
                         
                         <div>
                            <span class="text">Tổng số tiền cần phải đặt cọc:</span>
                            <span class="text active">${LoaiPhieuDat === 0 ? TienMonAn : convertToVND(TienMonAn + TienDatPhong)}</span>
                         </div>
                        <div>
                            <span class="text">Thực hiện thanh toán cho chúng tôi dựa trên phương thức đã trao đổi thông qua cuộc gọi</span>
                        </div>
                        <div>
                            <span class="text">Nếu chưa nhận được cuộc gọi từ chúng tôi, xin vui lòng liên hệ với số điện thoại: 0948105460 </span>
                        </div>
                    </div>
                        
                    <div class="mt-20">
                        <div class="text mt-10">Cảm ơn bạn đã đến với chúng tôi.</div>
                    </div>
                    <div class="mt-20">
                        <div class="text active text-right mt-10">Evergreen Garden</div>
                    </div>
                    
                   
                </div>
               
            </div>
        </div>
    </body>
    </html>`
    return html
}


const templateMailConfirmDepositOrder = ({LoaiPhieuDat , HoTen , ThoiGianBatDau , MaDonDat}) =>{
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            *{
                padding: 0;
                margin: 0;
                box-sizing: border-box;
            }
            html{
                font-style: normal;
            }
            .page{
                min-width: 100%;
                width: 100%;
                display: flex;
                justify-content: center;
                background-color: #f3f3f3;
            }
            .change-password{
                font-family: 'Google Sans';
                margin: 0 auto;
                width: 500px;
                background: #FFFFFF;
                border-radius: 10px;
                padding: 20px;
            }
            .body{
                padding: 15px 20px 30px;
    
            }
            .logo{
                width: 120px;
                height: 120px;
            }
            .logo img{
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
            .title{
                font-weight: 600;
                font-size: 20px;
                line-height: 25px;
                color: #000000;
            }
            .mt-70{
                margin-top: 70px;
            }
            .mt-20{
                margin-top: 20px;
            }
            .mt-30{
                margin-top: 30px;
            }
            .mt-10{
                margin-top: 10px;
            }
            .mb-10{
                margin-bottom: 10px;
            }
            .mt-6{
                margin-top: 6px;
            }
            .mt-4{
                margin-top: 4px;
            }
            .mt-25{
                margin-top: 25px;
            }
            .text{
                font-weight: 400;
                font-size: 14px;
                line-height: 18px;
                color: #444444;
            }
            .fz-20{
                font-size: 20px;
            }
            .font-otp{
                font-weight: 600 !important;
                font-size: 30px;
                letter-spacing: 5px;
            }
            .text.active{
                font-weight: 500;
                color: #F8993F;
            }
            .text-right{
                text-align: right;
            }
        </style>
    </head>
    <body>
        <div class="page">
            <div class="change-password">
                <div class="body">
                    <div class="logo">
                        <img src="https://res.cloudinary.com/dbar5movy/image/upload/v1680460830/RestaurantManagement/htsdibuokd0tjt5mz3zj.png"/>          
                    </div>
                    <div class="title">
                        Đặt cọc thành công đơn đặt ${LoaiPhieuDat === 0 ? "bàn" : LoaiPhieuDat === 1 ? "phòng" : "phòng vip"}
                    </div>
                    <div class="mt-20">
                        <div>
                            <span class="text">Xin chào</span>
                            <span class="text active">${HoTen}</span>
                       </div>
                       <div>
                            <span class="text">Mã đơn đặt của bạn là: ${MaDonDat}</span>
                        </div>
                        <div>
                            <span class="text">
                                Đến và cung cấp mã đơn đặt, email hoặc số điện thoại tại quầy lễ tân để tiến hành thủ tục nhận ${LoaiPhieuDat === 0 ? "bàn" : "phòng"}
                            </span>
                        </div>
                        <div>
                            <span class="text">
                                Hẹn gặp lại bạn vào ${convertDate(ThoiGianBatDau)}
                            </span>
                        </div>
                       
                        
                    </div>
                        
                    <div class="mt-20">
                        <div class="text mt-10">Cảm ơn bạn đã chọn chúng tôi.</div>
                    </div>
                    <div class="mt-20">
                        <div class="text active text-right mt-10">Evergreen Garden</div>
                    </div>
                    
                   
                </div>
               
            </div>
        </div>
    </body>
    </html>`
    return html
}

const templateMailCancelOrder = ({LoaiPhieuDat , HoTen }) =>{
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            *{
                padding: 0;
                margin: 0;
                box-sizing: border-box;
            }
            html{
                font-style: normal;
            }
            .page{
                min-width: 100%;
                width: 100%;
                display: flex;
                justify-content: center;
                background-color: #f3f3f3;
            }
            .change-password{
                font-family: 'Google Sans';
                margin: 0 auto;
                width: 500px;
                background: #FFFFFF;
                border-radius: 10px;
                padding: 20px;
            }
            .body{
                padding: 15px 20px 30px;
    
            }
            .logo{
                width: 120px;
                height: 120px;
            }
            .logo img{
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
            .title{
                font-weight: 600;
                font-size: 20px;
                line-height: 25px;
                color: #000000;
            }
            .mt-70{
                margin-top: 70px;
            }
            .mt-20{
                margin-top: 20px;
            }
            .mt-30{
                margin-top: 30px;
            }
            .mt-10{
                margin-top: 10px;
            }
            .mb-10{
                margin-bottom: 10px;
            }
            .mt-6{
                margin-top: 6px;
            }
            .mt-4{
                margin-top: 4px;
            }
            .mt-25{
                margin-top: 25px;
            }
            .text{
                font-weight: 400;
                font-size: 14px;
                line-height: 18px;
                color: #444444;
            }
            .fz-20{
                font-size: 20px;
            }
            .font-otp{
                font-weight: 600 !important;
                font-size: 30px;
                letter-spacing: 5px;
            }
            .text.active{
                font-weight: 500;
                color: #F8993F;
            }
            .text-right{
                text-align: right;
            }
        </style>
    </head>
    <body>
        <div class="page">
            <div class="change-password">
                <div class="body">
                    <div class="logo">
                        <img src="https://res.cloudinary.com/dbar5movy/image/upload/v1680460830/RestaurantManagement/htsdibuokd0tjt5mz3zj.png"/>          
                    </div>
                    <div class="title">
                        Đơn đặt ${LoaiPhieuDat === 0 ? "bàn" : LoaiPhieuDat === 1 ? "phòng" : "phòng vip"} của bạn đã bị hủy
                    </div>
                    <div class="mt-20">
                        <div>
                            <span class="text">Xin chào</span>
                            <span class="text active">${HoTen}</span>
                       </div>
                       <div>
                            <span class="text">Chúng tôi xin lỗi khi phải thông báo với bạn rằng đơn đặt hàng của bạn đã bị hủy</span>
                        </div>
                        <div>
                            <span class="text">
                                Để giải đáp những thắc mắc xin vui lòng liên hệ vào số điện thoại 0948105460
                            </span>
                        </div>
                        <div>
                            <span class="text">
                                Hẹn gặp lại bạn vào một dịp khác
                            </span>
                        </div>
                       
                        
                    </div>
                        
                    <div class="mt-20">
                        <div class="text mt-10">Cảm ơn bạn.</div>
                    </div>
                    <div class="mt-20">
                        <div class="text active text-right mt-10">Evergreen Garden</div>
                    </div>
                    
                   
                </div>
               
            </div>
        </div>
    </body>
    </html>`
    return html
}



module.exports = {
    getInfoData,
    generatePassword,
    sendMail,
    templateMailSendOTP,
    templateMailSendPassword,
    templateMailSendOrder,
    templateMailConfirmOrder,
    templateMailConfirmDepositOrder,
    templateMailCancelOrder
}