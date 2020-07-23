class DevicesUtils {
  static widthForCompare = window.innerWidth;
  static heightForCompare = window.innerHeight;

  static typeOfDevice = {
    MOBILE:
      (this.widthForCompare < 900 && this.heightForCompare < 501) ||
      (this.widthForCompare < 501 && this.heightForCompare < 900),

    DESKTOP: this.widthForCompare > 600 && this.widthForCompare < 960,
    TABLET:
      (this.widthForCompare >= 600 && this.heightForCompare <= 970) ||
      (this.heightForCompare < 1300 && this.widthForCompare >= 800)
  };

  static checkIfIsMobile() {
    return this.typeOfDevice.MOBILE;
  }

  static checkIfIsTablet() {
    return this.typeOfDevice.TABLET;
  }

  static returnStyleInAccordToDevice(
    styleOfMobile,
    styleOfTablet,
    styleOfDesktop
  ) {
    if (this.typeOfDevice.MOBILE) {
      return styleOfMobile;
    } else if (this.typeOfDevice.TABLET) {
      return styleOfTablet;
    } else if (this.typeOfDevice.DESKTOP) {
      return styleOfDesktop;
    }
  }
}

export default DevicesUtils;
