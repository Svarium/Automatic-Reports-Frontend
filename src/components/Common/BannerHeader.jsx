import bannerHeader from '../../assets/banner-header.png';

const BannerHeader = () => {
    return (
        <div className="banner-header">
            <img src={bannerHeader} alt="Header Banner" style={{ width: '100%', display: 'block' }} />
        </div>
    );
};

export default BannerHeader;
