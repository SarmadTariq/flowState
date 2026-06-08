type PageContainerProps = {
  children: React.ReactNode;
};

function PageContainer({children,}: PageContainerProps)
{
  return (
    <div className="page-container">
      {children}
    </div>
  );
}

export default PageContainer;