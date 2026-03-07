type ContactItemProps = {
  icon: string;
  info: string;
  link: string;
};

const ContactItem = ({ icon, info, link }: ContactItemProps) => {
  const isExternal = link.startsWith("http://") || link.startsWith("https://");
  const isPhone = link.startsWith("tel:");

  const content = (
    <>
      <img src={icon} alt="" />
      <div>{info}</div>
    </>
  );

  if (isPhone) {
    return (
      <>
        <a
          href={link}
          className="flex items-center gap-1 text-white continut-text md:hidden"
        >
          {content}
        </a>

        <div className="hidden items-center gap-1 text-white continut-text md:flex">
          {content}
        </div>
      </>
    );
  }

  return (
    <a
      href={link}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="flex items-center gap-1 text-white continut-text"
    >
      {content}
    </a>
  );
};

export default ContactItem;
