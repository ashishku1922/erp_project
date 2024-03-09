import { Typography } from "antd";

function AppFooter() {
  return (
    <div className="AppFooter" style={{ 
      background: "#333333",
      padding: '10px 20px',
      color: 'white',
      border: 'none',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Typography.Link href="tel:+91 8931082290" style={{ color: 'white', margin: '0 10px' }}>Contact No: +91 8931082290</Typography.Link>
      <Typography.Link href="https://www.google.com" target={"_blank"} style={{ color: 'white', margin: '0 10px' }}>
        Privacy Policy
      </Typography.Link>
      <Typography.Link href="https://www.google.com" target={"_blank"} style={{ color: 'white', margin: '0 10px' }}>
        Terms of Use
      </Typography.Link>
      <Typography.Link href="https://www.google.com" target={"_blank"} style={{ color: 'white', margin: '0 10px' }}>
        Help
      </Typography.Link>
    </div>
  );
}

export default AppFooter;
