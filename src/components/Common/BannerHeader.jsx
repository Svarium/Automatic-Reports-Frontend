import { useReport } from '../../context/ReportContext';
import { getLocalizedBanner } from '../../i18n/assets';

const BannerHeader = () => {
    const { language } = useReport();
    const bannerHeader = getLocalizedBanner(language, 'header');

    return (
        <div className="banner-header">
            <img src={bannerHeader} alt="Header Banner" style={{ width: '100%', display: 'block' }} />
        </div>
    );
};

export default BannerHeader;
