type ColumnProps = {
  title: string;
  children: React.ReactNode;
};

function Column({title, children}: ColumnProps)
{
  return (
    <div className="column">
      <h2>{title}</h2>

      <div className="column-content">
        {children}
      </div>
    </div>
  );
}

export default Column;