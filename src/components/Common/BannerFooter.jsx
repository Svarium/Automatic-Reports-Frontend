import { useReport } from '../../context/ReportContext';
import { getLocalizedBanner } from '../../i18n/assets';

const BannerFooter = () => {
    const { language } = useReport();
    const bannerFooter = getLocalizedBanner(language, 'footer');

    return (
        <div className="banner-footer">
            <img src={bannerFooter} alt="Footer Banner" style={{ width: '100%', display: 'block' }} />
        </div>
    );
};

export default BannerFooter;
