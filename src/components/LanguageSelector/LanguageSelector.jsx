import { LANGUAGES } from '../../i18n/translations';
import { useReport } from '../../context/ReportContext';
import './LanguageSelector.css';

const LanguageSelector = () => {
    const { language, setLanguage, t } = useReport();

    return (
        <div className="language-selector">
            <label className="language-selector-label" htmlFor="report-language">
                {t('language.label')}
            </label>
            <select
                id="report-language"
                className="language-selector-control"
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
            >
                {LANGUAGES.map((item) => (
                    <option key={item.code} value={item.code}>
                        {item.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSelector;
