import './globals.css';

export const metadata = {
  title: 'Project Manager',
  description: 'Manage projects, tasks, and users with ease',
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
