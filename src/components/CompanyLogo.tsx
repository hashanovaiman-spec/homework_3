interface CompanyLogoProps {
  company: string;
}

export const CompanyLogo = ({ company }: CompanyLogoProps) => {
  if (company === 'Победа') {
    return (
      <img
        className="company-logo company-logo_pobeda"
        src="/images/pobeda.svg"
        alt="Победа"
      />
    );
  }

  if (company === 'Red Wings') {
    return (
      <img
        className="company-logo company-logo_red-wings"
        src="/images/red-wings.svg"
        alt="Red Wings"
      />
    );
  }

  if (company === 'S7 Airlines') {
    return (
      <img
        className="company-logo company-logo_s7"
        src="/images/s7.svg"
        alt="S7 Airlines"
      />
    );
  }

  return null;
};