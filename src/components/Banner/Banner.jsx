import { Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Carousel from "./Carousel";
function Banner() {
  const BannerStyle = styled("div")(() => ({
    backgroundImage: "url(/banner2.jpg)",
    height: "100%",
  }));
  const BannerContain = styled("div")(() => ({
    height: 300,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-between",
  }));
  return (
    <>
      <BannerStyle>
        <Container>
          <BannerContain>
            <Typography
              variant="h1"
              style={{
                fontWeight: "bold",
                marginTop: 30,
                marginBottom: 15,
                textAlign: "center",
              }}
            >
              Crypto News
              <Typography
                variant="subtitle1"
                style={{
                  color: "darkgray",
                  textTransform: "capitalize",
                }}
              >
                {" "}
                ALL the news you want
              </Typography>
            </Typography>
          </BannerContain>
          <Carousel />
        </Container>
      </BannerStyle>
    </>
  );
}

export default Banner;
