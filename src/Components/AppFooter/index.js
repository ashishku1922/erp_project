import { Typography } from "antd";

function AppFooter() {
  return (
    <div className="AppFooter" style={{ 
      background: "#333333",

      padding: '10px 0',
      color: 'white',
      border: 'none'
    }}>
      <Typography.Link href="tel:+91 8931082290" style={{ color: 'white' }}>Contact No: +91 8931082290</Typography.Link>
      <Typography.Link href="https://www.google.com" target={"_blank"} style={{ color: 'white', marginLeft: '20px' }}>
        Privacy Policy
      </Typography.Link>
      <Typography.Link href="https://www.google.com" target={"_blank"} style={{ color: 'white', marginLeft: '20px' }}>
        Terms of Use
      </Typography.Link>
      <Typography.Link href="https://www.google.com" target={"_blank"} style={{ color: 'white', marginLeft: '20px' }}>
        Help
      </Typography.Link>

    </div>
  );
}

export default AppFooter;
