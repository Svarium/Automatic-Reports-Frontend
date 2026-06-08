import bannerHeaderEs from '../assets/banner-header.png';
import bannerFooterEs from '../assets/banner-footer.png';
import bannerHeaderEn from '../assets/banner-header-inglés.png';
import bannerFooterEn from '../assets/banner-footer-ingles.png';
import bannerHeaderPt from '../assets/banner-header-portugués.png';
import bannerFooterPt from '../assets/banner-footer-portuges.png';

export const localizedBanners = {
    es: {
        header: bannerHeaderEs,
        footer: bannerFooterEs,
    },
    en: {
        header: bannerHeaderEn,
        footer: bannerFooterEn,
    },
    pt: {
        header: bannerHeaderPt,
        footer: bannerFooterPt,
    },
};

export const getLocalizedBanner = (language, type) =>
    localizedBanners[language]?.[type] || localizedBanners.es[type];
