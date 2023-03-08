export const NumberedList = ({
  items,
  resourceName,
  itemComponent: ItemCommponent,
}) => {
  return (
    <>
      {items.map((item, i) => (
        <>
          <h3>{i + 1}</h3>
          <ItemCommponent key={i} {...{ [resourceName]: item }} />
        </>
      ))}
    </>
  );
};
