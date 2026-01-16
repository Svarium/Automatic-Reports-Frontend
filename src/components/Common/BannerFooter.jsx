import bannerFooter from '../../assets/banner-footer.png';

const BannerFooter = () => {
    return (
        <div className="banner-footer">
            <img src={bannerFooter} alt="Footer Banner" style={{ width: '100%', display: 'block' }} />
        </div>
    );
};

export default BannerFooter;
