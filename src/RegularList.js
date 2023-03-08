export const RegularList = ({ 
    items,
    resourceName,
    itemComponent: ItemCommponent,
 }) => {
    return (
        <>
            {items.map((item, i) => (
                <ItemCommponent key={i} {...{[resourceName]: item}} />
            ))}
        </>
    )
}