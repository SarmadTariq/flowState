type AuthCardProps = {
  title: string;
  children: React.ReactNode;
};

function AuthCard({
  title,
  children,
}: AuthCardProps) {
  return (
    <div className="auth-card">
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export default AuthCard;