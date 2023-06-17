const SectionHeader = ({ heading, subheading }) => {
  return (
    <div className="mx-auto text-center my-8 w-fit">
      <h1 className="md:text-4xl text-primary uppercase font-bold border-y-2 p-3">
        {heading}
      </h1>
      <p className="text-secondary my-2">--- {subheading} ---</p>
    </div>
  );
};

export default SectionHeader;
