import React from 'react';
import fb from '../../asset/image/fb.svg'
import youtube from '../../asset/image/youtube.svg'
import zalo from '../../asset/image/zalo.svg'
import appstore from '../../asset/image/appstore.png'
import chplay from '../../asset/image/playstore.png'

function Footer(props) {
    return (
        <>
           <div className="footer row">
                <div className="col-sm-6 col-md-6 col-lg-3">
                    <ul>
                        <li>HỖ TRỢ KHÁCH HÀNG</li>
                        <li style={{color: "red"}}>Hotline chăm sóc khách hàng: 1900-6035</li>
                        <li style={{color: "red"}}>(1000đ/phút , 8-21h kể cả T7, CN)</li>
                        <li>Các câu hỏi thường gặp</li>
                        <li>Gửi yêu cầu hỗ trợ</li>
                        <li>Hướng dẫn đặt hàng</li>
                        <li>Chính sách đổi trả</li>
                        <li>Hỗ trợ khách hàng: hotro@bookstore.vn</li>
                        <li>Báo lỗi bảo mật: security@bookstore.vn</li>
                    </ul>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-3">
                    <ul>
                        <li>VỀ BOOKSTORE</li>
                        <li>Giới thiệu BOOKSTORE</li>
                        <li>Chính sách bảo mật thông tin cá nhân</li>
                        <li>Chính sách giải quyết khiếu nại</li>
                        <li>Điều khoản sử dụng</li>
                        <li>Đăng ký bán hàng</li>
                    </ul>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-3">
                    <ul>
                        <li>HỢP TÁC VÀ LIÊN KẾT</li>
                        <li>Bán hàng cùng BOOKSTORE</li>
                        <li>Đối tác cùng BOOKSTORE</li>
                    </ul>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-3">
                    <ul>
                        <li>KẾT NỐI VỚI CHÚNG TÔI</li>
                        <li>
                            <ul className="footer-icon">
                                <li><img  src={fb} alt="fb" /></li>
                                <li><img src={youtube} alt="youtube" /></li>
                                <li><img style={{width: "32px", height: "32px"}} src={zalo} alt="zalo" /></li>
                            </ul>
                        </li>
                        <li style={{fontWeight: 500}}>TẢI ỨNG DỤNG TRÊN ĐIỆN THOẠI</li>
                        <li style={{margin: "5px"}}><img style={{width: "134px", height: "40px"}} src={appstore} alt="appstore" /></li>
                        <li style={{margin: "5px"}}><img style={{width: "134px", height: "40px"}} src={chplay} alt="chplay" /></li>
                    </ul>
                </div> 
            </div>    
        </>
    );
}

export default Footer;