import Svg, { Path, Circle } from "react-native-svg";
import {vs} from "react-native-size-matters";

// TYPES
import { IconProps } from "../types/IconProps";


const paths = {
    return: [
        "M28.125 53.4375L11.25 36.5625L28.125 19.6875",
        "M78.75 70.3125C78.75 61.3614 75.1942 52.777 68.8649 46.4476C62.5355 40.1183 53.9511 36.5625 45 36.5625H11.25"
    ],
    close: [
        "M15 75L75 15",
        "M75 75L15 15"
    ],
    search: [
        "M6.79669 11.7188C9.51497 11.7188 11.7186 9.51515 11.7186 6.79688C11.7186 4.0786 9.51497 1.875 6.79669 1.875C4.07842 1.875 1.87482 4.0786 1.87482 6.79688C1.87482 9.51515 4.07842 11.7188 6.79669 11.7188Z",
        "M10.2768 10.2773L13.1245 13.125"
    ],
    user: [
        "M15 20.125C18.0376 20.125 20.5 17.7745 20.5 14.875C20.5 11.9755 18.0376 9.625 15 9.625C11.9624 9.625 9.5 11.9755 9.5 14.875C9.5 17.7745 11.9624 20.125 15 20.125Z",
        "M6.66312 24.718C7.50836 23.3214 8.72374 22.1618 10.1871 21.3556C11.6505 20.5494 13.3104 20.125 15.0001 20.125C16.6897 20.125 18.3496 20.5495 19.813 21.3557C21.2764 22.162 22.4918 23.3216 23.337 24.7181"
    ],
    megaphone: [
        "M15.1874 8.38057V21.416C15.1874 21.5727 15.2311 21.7263 15.3135 21.8596C15.3958 21.9929 15.5137 22.1006 15.6539 22.1707L17.6217 23.1546C17.7347 23.2111 17.8589 23.2415 17.9853 23.2436C18.1116 23.2456 18.2368 23.2193 18.3516 23.1665C18.4664 23.1137 18.5678 23.0358 18.6485 22.9385C18.7291 22.8413 18.7869 22.7272 18.8176 22.6046L20.2499 16.875",
        "M20.2499 16.875C21.3688 16.875 22.4419 16.4305 23.2331 15.6394C24.0242 14.8482 24.4687 13.7751 24.4687 12.6562C24.4687 11.5374 24.0242 10.4643 23.2331 9.67314C22.4419 8.88197 21.3688 8.4375 20.2499 8.4375H16.0312C16.0312 8.4375 10.2882 8.4375 4.76175 3.8024C4.63884 3.69895 4.48894 3.63274 4.32969 3.61157C4.17044 3.5904 4.00846 3.61515 3.86279 3.68289C3.71712 3.75064 3.59383 3.85857 3.50741 3.994C3.42099 4.12942 3.37503 4.28671 3.37495 4.44736V20.8651C3.37503 21.0258 3.42099 21.1831 3.50741 21.3185C3.59383 21.4539 3.71712 21.5619 3.86279 21.6296C4.00846 21.6973 4.17044 21.7221 4.32969 21.7009C4.48894 21.6797 4.63884 21.6135 4.76175 21.5101C10.2882 16.875 16.0312 16.875 16.0312 16.875H20.2499Z"
    ],
    message: [
        "M4.79129 18.6678C3.53332 16.5471 3.09277 14.0402 3.55236 11.6178C4.01195 9.19532 5.34007 7.02396 7.28731 5.51143C9.23456 3.9989 10.667 3.24924 14.1278 3.40324C16.5887 3.55723 18.9087 4.60428 20.6522 6.34777C22.3957 8.09125 23.4427 10.4112 23.5967 12.8721C23.7508 15.333 23.0011 17.7654 21.4886 19.7126C19.9761 21.6599 17.8047 22.988 15.3823 23.4476C12.9598 23.9072 10.4529 23.4667 8.33227 22.2087L8.33229 22.2086L4.83531 23.2078C4.69063 23.2491 4.53752 23.251 4.39186 23.2133C4.2462 23.1755 4.11329 23.0995 4.00689 22.9931C3.90049 22.8867 3.82448 22.7538 3.78673 22.6081C3.74899 22.4625 3.75088 22.3094 3.79222 22.1647L4.79136 20.6677L4.79129 23.6678Z",
        "M10.125 11.3906H16.875",
        "M10.125 15.6094H16.875"
    ],
    home: [
        "M18.9993 25.9991V19.999C18.9993 19.7337 18.8939 19.4794 18.7064 19.2919C18.5188 19.1043 18.2645 18.999 17.9993 18.999H13.9993C13.7341 18.999 13.4797 19.1043 13.2922 19.2919C13.1046 19.4794 12.9993 19.7337 12.9993 19.999V25.9991C12.9993 26.2643 12.8939 26.5186 12.7064 26.7061C12.5189 26.8937 12.2646 26.9991 11.9994 26.9991L6.00012 26.9999C5.86879 26.9999 5.73874 26.974 5.6174 26.9238C5.49606 26.8735 5.38581 26.7999 5.29294 26.707C5.20007 26.6142 5.12639 26.5039 5.07613 26.3826C5.02587 26.2613 5 26.1312 5 25.9999V14.4423C5 14.303 5.02911 14.1652 5.08547 14.0378C5.14183 13.9104 5.22418 13.7962 5.32726 13.7024L15.3266 4.6106C15.5106 4.44323 15.7505 4.35049 15.9993 4.35048C16.2481 4.35047 16.4879 4.4432 16.672 4.61055L26.6727 13.7024C26.7758 13.7962 26.8582 13.9104 26.9145 14.0378C26.9709 14.1652 27 14.303 27 14.4424V25.9999C27 26.1312 26.9741 26.2613 26.9239 26.3826C26.8736 26.5039 26.7999 26.6142 26.7071 26.707C26.6142 26.7999 26.5039 26.8736 26.3826 26.9238C26.2613 26.974 26.1312 26.9999 25.9999 26.9999L19.9991 26.9991C19.7339 26.9991 19.4796 26.8937 19.2921 26.7062C19.1046 26.5186 18.9993 26.2643 18.9993 25.9991V25.9991Z"
    ],
    graph: [
        "M23.625 21.9375H3.375V5.0625",
        "M21.9377 6.75L13.5002 15.1875L10.1252 11.8125L3.37521 18.5625",
        "M21.9377 10.9688V6.75H17.719"
    ],
    store: [
        "M5.0625 14.7222V21.9375C5.0625 22.1613 5.15139 22.3759 5.30963 22.5341C5.46786 22.6924 5.68247 22.7812 5.90625 22.7812H21.0938C21.3175 22.7812 21.5321 22.6924 21.6904 22.5341C21.8486 22.3759 21.9375 22.1613 21.9375 21.9375V14.7223",
        "M5.69894 4.21875H21.3011C21.4844 4.21875 21.6628 4.27848 21.8092 4.38889C21.9555 4.49931 22.062 4.6544 22.1123 4.8307L23.625 10.125H3.375L4.88766 4.8307C4.93803 4.6544 5.04446 4.49931 5.19084 4.38889C5.33722 4.27848 5.51559 4.21875 5.69894 4.21875Z",
        "M10.125 10.125V11.8125C10.125 12.7076 9.76942 13.566 9.13649 14.199C8.50355 14.8319 7.64511 15.1875 6.75 15.1875C5.85489 15.1875 4.99645 14.8319 4.36351 14.199C3.73058 13.566 3.375 12.7076 3.375 11.8125V10.125",
        "M16.875 10.125V11.8125C16.875 12.7076 16.5194 13.566 15.8865 14.199C15.2535 14.8319 14.3951 15.1875 13.5 15.1875C12.6049 15.1875 11.7464 14.8319 11.1135 14.199C10.4806 13.566 10.125 12.7076 10.125 11.8125V10.125",
        "M23.625 10.125V11.8125C23.625 12.7076 23.2694 13.566 22.6365 14.199C22.0035 14.8319 21.1451 15.1875 20.25 15.1875C19.3549 15.1875 18.4965 14.8319 17.8635 14.199C17.2306 13.566 16.875 12.7076 16.875 11.8125V10.125"
    ],
    checkmark: [
        "M7.59375 2.53143L3.65625 6.46876L1.6875 4.50018"
    ],
    send: [
        "M20.5816 11.3456L4.74585 2.47758C4.61262 2.40297 4.4598 2.37081 4.30781 2.38538C4.15582 2.39996 4.0119 2.46057 3.89528 2.55913C3.77866 2.65769 3.6949 2.7895 3.65519 2.93694C3.61549 3.08437 3.62173 3.24042 3.67309 3.38421L6.66006 11.7477C6.71832 11.9109 6.71832 12.0891 6.66006 12.2522L3.67309 20.6158C3.62173 20.7596 3.61549 20.9156 3.65519 21.063C3.6949 21.2105 3.77866 21.3423 3.89528 21.4408C4.0119 21.5394 4.15582 21.6 4.30781 21.6146C4.45981 21.6292 4.61263 21.597 4.74585 21.5224L20.5816 12.6544C20.6979 12.5892 20.7948 12.4943 20.8622 12.3792C20.9296 12.2642 20.9652 12.1333 20.9652 12C20.9652 11.8667 20.9296 11.7358 20.8622 11.6207C20.7948 11.5057 20.6979 11.4108 20.5816 11.3456V11.3456Z",
        "M6.75 12H12.75"
    ],
    plus: [
        "M2.8125 9H15.1875",
        "M9 2.8125V15.1875"
    ],
    expand: [
        "M17.7188 5.0625H21.9375V9.28125",
        "M16.0312 10.9688L21.9375 5.0625",
        "M9.28125 21.9375H5.0625V17.7188",
        "M10.9688 16.0312L5.0625 21.9375",
        "M21.9375 17.7188V21.9375H17.7188",
        "M16.0312 16.0312L21.9375 21.9375",
        "M5.0625 9.28125V5.0625H9.28125",
        "M10.9688 10.9688L5.0625 5.0625"
    ],
    logo: [
        "M0.555 8.12C0.555 9.86 1.14 11.3 2.31 12.455C3.48 13.61 4.92 14.18 6.63 14.18C7.89 14.18 9 13.88 9.96 13.265C10.935 12.65 11.625 11.81 12.045 10.73L9.405 9.47C8.85 10.745 7.935 11.375 6.645 11.375C5.76 11.375 5.025 11.06 4.44 10.415C3.87 9.77 3.585 9.005 3.585 8.105C3.585 7.205 3.885 6.44 4.47 5.795C5.07 5.15 5.79 4.835 6.645 4.835C7.95 4.835 8.865 5.465 9.375 6.71L11.985 5.465C11.58 4.385 10.92 3.545 9.975 2.96C9.03 2.36 7.935 2.06 6.69 2.06C4.965 2.06 3.51 2.645 2.325 3.83C1.14 5.015 0.555 6.44 0.555 8.12ZM15.9671 11.84H20.4971L21.3071 14H24.4421L19.9271 2.255H16.5971L12.0821 14H15.1871L15.9671 11.84ZM19.6571 9.335H16.8371L18.2321 5.585L19.6571 9.335ZM36.0014 6.95V14H38.8964V2.255H35.2064L32.2064 9.65L29.0864 2.255H25.5314V14H28.3664V7.04H28.3964L31.2914 14H33.1064L35.9714 6.95H36.0014ZM41.3224 14H44.2774V9.95H45.7324C47.0674 9.95 48.1624 9.62 49.0174 8.975C49.8724 8.315 50.3074 7.34 50.3074 6.065C50.3074 4.82 49.9024 3.875 49.0924 3.23C48.2824 2.585 47.2174 2.255 45.9124 2.255H41.3224V14ZM44.2774 4.85H45.6724C46.7824 4.85 47.3374 5.3 47.3374 6.185C47.3374 7.01 46.7824 7.43 45.6874 7.43H44.2774V4.85ZM58.5886 2.255V9.38C58.5886 10.535 58.0336 11.405 56.6686 11.405C55.4086 11.405 54.7636 10.565 54.7636 9.32V2.255H51.7786V9.365C51.7786 12.305 53.3536 14.165 56.6386 14.165C59.9236 14.165 61.5736 12.38 61.5736 9.32V2.255H58.5886ZM72.386 10.49C72.386 9.53 72.041 8.78 71.366 8.24C70.691 7.685 69.611 7.19 68.111 6.755C66.866 6.395 66.521 6.05 66.521 5.555C66.521 4.97 67.046 4.565 67.781 4.565C68.726 4.565 69.386 5.03 69.776 5.96L72.191 4.64C71.531 3.08 70.016 2.06 67.856 2.06C66.671 2.06 65.666 2.405 64.826 3.095C64.001 3.77 63.581 4.655 63.581 5.72C63.581 7.685 64.931 8.75 67.571 9.47C68.966 9.845 69.401 10.145 69.401 10.67C69.401 11.27 68.831 11.645 67.886 11.645C66.761 11.645 65.981 11.165 65.546 10.205L63.101 11.465C63.866 13.265 65.456 14.165 67.871 14.165C69.296 14.165 70.406 13.82 71.201 13.13C71.996 12.44 72.386 11.555 72.386 10.49Z",
        "M19.685 24.95V32H22.58V20.255H18.89L15.89 27.65L12.77 20.255H9.215V32H12.05V25.04H12.08L14.975 32H16.79L19.655 24.95H19.685ZM27.556 29.84H32.086L32.896 32H36.031L31.516 20.255H28.186L23.671 32H26.776L27.556 29.84ZM31.246 27.335H28.426L29.821 23.585L31.246 27.335ZM40.0753 27.875H41.0353L43.3903 32H46.6003L43.9903 27.425C45.3853 26.93 46.3303 25.835 46.3303 24.035C46.3303 22.79 45.9253 21.86 45.1303 21.215C44.3353 20.57 43.2703 20.255 41.9353 20.255H37.1203V32H40.0753V27.875ZM40.0753 22.805H41.6953C42.8503 22.805 43.3603 23.345 43.3603 24.14C43.3603 24.92 42.7753 25.355 41.7103 25.355H40.0753V22.805ZM51.2231 32V26.435L54.9431 32H58.6181L54.2981 25.835L58.3331 20.255H54.8531L51.2231 25.295V20.255H48.2531V32H51.2231ZM67.9132 20.255H59.7082V32H67.9582V29.36H62.6332V27.335H67.4332V24.8H62.6332V22.88H67.9132V20.255ZM72.3471 32H75.3021V22.94H78.6171V20.255H69.0171V22.94H72.3471V32Z"
    ],
    verified: [
        "M19.5691 10.5507C20.0093 9.15066 21.9907 9.15066 22.4309 10.5507L24.0375 15.6602C24.234 16.2851 24.8134 16.7102 25.4685 16.7102H30.7695C32.2106 16.7102 32.8226 18.5445 31.6701 19.4098L27.2977 22.6924C26.7892 23.0742 26.5766 23.7352 26.7674 24.3419L28.4174 29.5892C28.8546 30.9799 27.2517 32.114 26.0858 31.2387L21.9006 28.0966C21.367 27.696 20.633 27.696 20.0994 28.0966L15.9142 31.2387C14.7483 32.114 13.1454 30.9799 13.5826 29.5892L15.2326 24.3419C15.4234 23.7352 15.2108 23.0742 14.7023 22.6924L10.3299 19.4098C9.17742 18.5445 9.78936 16.7102 11.2305 16.7102H16.5315C17.1866 16.7102 17.766 16.2851 17.9625 15.6602L19.5691 10.5507Z",
        "M13.9599 13.3134C13.591 11.9079 15.236 10.8515 16.3606 11.7716L20.4899 15.1504C20.9928 15.5619 21.7035 15.6028 22.2503 15.2516L26.7397 12.3686C27.9623 11.5834 29.4755 12.8215 28.9478 14.1754L27.0105 19.1466C26.7745 19.7521 26.9553 20.4406 27.4582 20.8522L31.5874 24.2309C32.712 25.1511 32.0021 26.9727 30.5514 26.8893L25.2248 26.583C24.5761 26.5457 23.977 26.9303 23.7411 27.5358L21.8037 32.507C21.2761 33.8609 19.3242 33.7487 18.9553 32.3432L17.6006 27.1827C17.4356 26.5541 16.8847 26.1033 16.2359 26.066L10.9093 25.7597C9.45862 25.6762 8.96222 23.7852 10.1849 23L14.6742 20.1169C15.221 19.7658 15.4795 19.1025 15.3145 18.4739L13.9599 13.3134Z",
        "M24.1737 19.5857L19.5194 24.2397L17.1923 21.9128"
    ],
    reload: [
        "M26.5071 33.1088H10.5696V17.1713",
        "M21.8392 63.1608C25.9255 67.2471 31.1318 70.0299 36.7997 71.1573C42.4676 72.2847 48.3425 71.7061 53.6815 69.4946C59.0205 67.2831 63.5839 63.5381 66.7945 58.7331C70.0051 53.9281 71.7187 48.2789 71.7187 42.5C71.7187 36.7211 70.0051 31.0719 66.7945 26.2669C63.5839 21.4619 59.0205 17.7169 53.6815 15.5054C48.3425 13.2939 42.4676 12.7153 36.7997 13.8427C31.1318 14.9701 25.9255 17.7529 21.8392 21.8392L10.5697 33.1087"
    ],
    star: [
        "M9.31015 13.4109L12.8564 15.6576C13.3097 15.9448 13.8725 15.5177 13.738 14.9886L12.7134 10.9581C12.6845 10.8458 12.688 10.7277 12.7233 10.6173C12.7586 10.5069 12.8243 10.4087 12.9129 10.334L16.093 7.68719C16.5108 7.33941 16.2951 6.64595 15.7583 6.61111L11.6054 6.34158C11.4935 6.33359 11.3862 6.29399 11.296 6.22738C11.2058 6.16078 11.1363 6.06991 11.0957 5.96537L9.54688 2.06492C9.50478 1.95396 9.42992 1.85843 9.33224 1.79102C9.23456 1.7236 9.11868 1.6875 9 1.6875C8.88132 1.6875 8.76544 1.7236 8.66777 1.79102C8.57009 1.85843 8.49523 1.95396 8.45312 2.06492L6.90426 5.96537C6.86367 6.06991 6.79423 6.16078 6.70401 6.22738C6.61378 6.29399 6.5065 6.33359 6.39464 6.34158L2.24171 6.61111C1.70486 6.64595 1.4892 7.33941 1.90704 7.68719L5.08709 10.334C5.17571 10.4087 5.24145 10.5069 5.27674 10.6173C5.31204 10.7277 5.31546 10.8458 5.2866 10.9581L4.33641 14.6959C4.175 15.3309 4.85036 15.8434 5.39432 15.4988L8.68985 13.4109C8.78254 13.3519 8.89013 13.3205 9 13.3205C9.10987 13.3205 9.21747 13.3519 9.31015 13.4109V13.4109Z"
    ],
    halfStar: [
        "M8.3125 11.8297V2L6.5625 5.20901L1.3125 6.45039L4.8125 9.76073L4.375 14.3125L8.3125 11.8297Z",
        "M8.62265 12.7234L12.1689 14.9701C12.6222 15.2573 13.185 14.8302 13.0505 14.3011L12.0259 10.2706C11.997 10.1583 12.0005 10.0402 12.0358 9.9298C12.0711 9.8194 12.1368 9.7212 12.2254 9.6465L15.4055 6.99969C15.8233 6.65191 15.6076 5.95845 15.0708 5.92361L10.9179 5.65408C10.806 5.64609 10.6987 5.60649 10.6085 5.53988C10.5183 5.47328 10.4488 5.38241 10.4082 5.27787L8.85938 1.37742C8.81728 1.26646 8.74242 1.17093 8.64474 1.10352C8.54706 1.0361 8.43118 1 8.3125 1C8.19382 1 8.07794 1.0361 7.98027 1.10352C7.88259 1.17093 7.80773 1.26646 7.76562 1.37742L6.21676 5.27787C6.17617 5.38241 6.10673 5.47328 6.01651 5.53988C5.92628 5.60649 5.819 5.64609 5.70714 5.65408L1.55421 5.92361C1.01736 5.95845 0.801698 6.65191 1.21954 6.99969L4.39959 9.6465C4.48821 9.7212 4.55395 9.8194 4.58924 9.9298C4.62454 10.0402 4.62796 10.1583 4.5991 10.2706L3.64891 14.0084C3.4875 14.6434 4.16286 15.1559 4.70682 14.8113L8.00235 12.7234C8.09504 12.6644 8.20263 12.633 8.3125 12.633C8.42237 12.633 8.52997 12.6644 8.62265 12.7234V12.7234Z"
    ],
    qr: [
        "M25.188 11.625H13.563C12.4929 11.625 11.6255 12.4924 11.6255 13.5625V25.1875C11.6255 26.2576 12.4929 27.125 13.563 27.125H25.188C26.258 27.125 27.1255 26.2576 27.1255 25.1875V13.5625C27.1255 12.4924 26.258 11.625 25.188 11.625Z",
        "M25.188 34.875H13.563C12.4929 34.875 11.6255 35.7424 11.6255 36.8125V48.4375C11.6255 49.5076 12.4929 50.375 13.563 50.375H25.188C26.258 50.375 27.1255 49.5076 27.1255 48.4375V36.8125C27.1255 35.7424 26.258 34.875 25.188 34.875Z",
        "M48.438 11.625H36.813C35.7429 11.625 34.8755 12.4924 34.8755 13.5625V25.1875C34.8755 26.2576 35.7429 27.125 36.813 27.125H48.438C49.508 27.125 50.3755 26.2576 50.3755 25.1875V13.5625C50.3755 12.4924 49.508 11.625 48.438 11.625Z",
        "M34.8755 34.875V42.625",
        "M34.8755 50.375H42.6255V34.875",
        "M42.6255 38.75H50.3755",
        "M50.3755 46.5V50.375",
    ],
    camera: [
        "M26 26H6C5.46957 26 4.96086 25.7893 4.58579 25.4142C4.21071 25.0391 4 24.5304 4 24V10C4 9.46957 4.21071 8.96086 4.58579 8.58579C4.96086 8.21071 5.46957 8 6 8H9.99927L11.9993 5H19.9993L21.9993 8H26C26.5304 8 27.0391 8.21071 27.4142 8.58579C27.7893 8.96086 28 9.46957 28 10V24C28 24.5304 27.7893 25.0391 27.4142 25.4142C27.0391 25.7893 26.5304 26 26 26Z",
        "M16 21C18.4853 21 20.5 18.9853 20.5 16.5C20.5 14.0147 18.4853 12 16 12C13.5147 12 11.5 14.0147 11.5 16.5C11.5 18.9853 13.5147 21 16 21Z"
    ],
    settings: [
        "M27.5 21.9165V10.0835C27.5 9.90638 27.453 9.73246 27.3637 9.57951C27.2745 9.42655 27.1462 9.30004 26.9921 9.2129L16.4921 3.27812C16.3419 3.19327 16.1724 3.14868 16 3.14868C15.8276 3.14868 15.6581 3.19327 15.5079 3.27812L5.00794 9.2129C4.85378 9.30004 4.72551 9.42655 4.63627 9.57951C4.54703 9.73246 4.5 9.90638 4.5 10.0835V21.9165C4.5 22.0936 4.54703 22.2675 4.63627 22.4205C4.72551 22.5734 4.85378 22.7 5.00794 22.7871L15.5079 28.7219C15.6581 28.8067 15.8276 28.8513 16 28.8513C16.1724 28.8513 16.3419 28.8067 16.4921 28.7219L26.9921 22.7871C27.1462 22.7 27.2745 22.5734 27.3637 22.4205C27.453 22.2675 27.5 22.0936 27.5 21.9165V21.9165Z",
        "M16 20.5C18.4853 20.5 20.5 18.4853 20.5 16C20.5 13.5147 18.4853 11.5 16 11.5C13.5147 11.5 11.5 13.5147 11.5 16C11.5 18.4853 13.5147 20.5 16 20.5Z"
    ]
}


export default function Icon ({name, size, color, style}: IconProps) {
    if(name == "return") {
        return (
            <Svg width={size} height={size} viewBox="0 0 90 90">
                <Path d={paths.return[0]} stroke={color} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round"/>
                <Path d={paths.return[1]} stroke={color} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
        )
    }
    else if(name == "close") {
        return(
            <Svg width={size} height={size} viewBox="0 0 90 90">
                <Path d={paths.close[0]} strokeWidth={15} stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
                <Path d={paths.close[1]} strokeWidth={15} stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
        )
    }
    else if(name == "search") {
        return(
            <Svg width={size} height={size} viewBox="0 0 15 15">
                <Path d={paths.search[0]} stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
                <Path d={paths.search[1]} stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
        )
    }
    else if(name == "user") {
        return(
            <Svg width={size} height={size} viewBox="0 0 30 30">
                <Path d={paths.user[0]} stroke={color} strokeWidth={2}/>
                <Path d={paths.user[1]} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                <Circle cx="15" cy="15" r="14" stroke={color} strokeWidth={2}/>
            </Svg>
        )
    }
    else if(name == "megaphone") {
        return(
            <Svg width={size} height={size} viewBox="0 0 27 27">
                <Path d={paths.megaphone[0]} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                <Path d={paths.megaphone[1]} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
        )
    }
    else if(name == "message") {
        return(
            <Svg width={size} height={size} viewBox="0 0 27 27">
                <Path d={paths.message[0]} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                <Path d={paths.message[1]} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                <Path d={paths.message[2]} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
        )
    }
    else if(name == "home") {
        return(
            <Svg width={size} height={size} viewBox="0 0 32 32">
                <Path d={paths.home[0]} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
        )
    }
    else if(name == "graph") {
        return(
            <Svg width={size} height={size} viewBox="0 0 27 27">
                <Path d={paths.graph[0]} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                <Path d={paths.graph[1]} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                <Path d={paths.graph[2]} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
        )
    }
    else if(name == "store") {
        return(
            <Svg width={size} height={size} viewBox="0 0 27 27">
                <Path d={paths.store[0]} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                <Path d={paths.store[1]} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                <Path d={paths.store[2]} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                <Path d={paths.store[3]} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                <Path d={paths.store[4]} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
        )
    }
    else if(name == "checkmark") {
        return(
            <Svg width={size} height={size} viewBox="0 0 9 9">
                <Path d={paths.checkmark[0]} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
        )
    }
    else if(name == "send") {
        return(
            <Svg width={size} height={size} viewBox="0 0 24 24">
                <Path d={paths.send[0]} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                <Path d={paths.send[1]} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
        )
    }
    else if(name == "plus") {
        return(
            <Svg width={size} height={size} viewBox="0 0 18 18">
                <Path d={paths.plus[0]} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                <Path d={paths.plus[1]} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
        )
    }
    else if(name == "expand") {
        return(
            <Svg width={size} height={size} viewBox="0 0 27 27">
                <Path d={paths.expand[0]} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                <Path d={paths.expand[1]} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                <Path d={paths.expand[2]} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                <Path d={paths.expand[3]} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                <Path d={paths.expand[4]} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                <Path d={paths.expand[5]} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                <Path d={paths.expand[6]} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                <Path d={paths.expand[7]} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
        )
    }
    else if(name == "logo") {
        return(
            <Svg width={size+20} height={size} viewBox="0 0 79 39" style={style}>
                <Path d={paths.logo[0]} fill={color}/>
                <Path d={paths.logo[1]} fill={color}/>
            </Svg>
        )
    }
    else if(name == "verified") {
        return(
            <Svg width={size+20} height={size} viewBox="0 0 42 43" style={{marginTop: vs(-5)}}>
                <Path d={paths.verified[0]} fill={color}/>
                <Path d={paths.verified[1]} fill={color}/>
                <Path d={paths.verified[2]} stroke={"#FFF"} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
        )
    }
    else if(name == "reload") {
        return(
            <Svg width={size} height={size} viewBox="0 0 85 85">
                <Path d={paths.reload[0]} stroke={color} strokeWidth={9.5} strokeLinecap="round" strokeLinejoin="round"/>
                <Path d={paths.reload[1]} stroke={color} strokeWidth={9.5} strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
        )
    }
    else if(name == "star") {
        return(
            <Svg width={size} height={size} viewBox="0 0 18 18" style={{marginRight: vs(2)}}>
                <Path d={paths.star[0]} stroke={color} fill={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
        )
    }
    else if(name == "halfStar") {
        return(
            <Svg width={size} height={size} viewBox="0 0 17 16" style={{marginRight: vs(2)}}>
                <Path d={paths.halfStar[0]} fill={color}/>
                <Path d={paths.halfStar[1]} stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
        )
    }
    else if(name == "emptyStar") {
        return(
            <Svg width={size} height={size} viewBox="0 0 18 18" style={{marginRight: vs(2)}}>
                <Path d={paths.star[0]} stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
        )
    }
    else if(name == "qr") {
        return (
            <Svg width={size} height={size} viewBox="0 0 62 62">
                <Path d={paths.qr[0]} strokeWidth={4} stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
                <Path d={paths.qr[1]} strokeWidth={4} stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
                <Path d={paths.qr[2]} strokeWidth={4} stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
                <Path d={paths.qr[3]} strokeWidth={4} stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
                <Path d={paths.qr[4]} strokeWidth={4} stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
                <Path d={paths.qr[5]} strokeWidth={4} stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
                <Path d={paths.qr[6]} strokeWidth={4} stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
        )
    }
    else if(name == "camera") {
        return (
            <Svg width={size} height={size} viewBox="0 0 32 32">
                <Path d={paths.camera[0]} strokeWidth={2.5} stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
                <Path d={paths.camera[1]} strokeWidth={2.5} stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
        )
    }
    else if(name == "settings") {
        return (
            <Svg width={size} height={size} viewBox="0 0 32 32">
                <Path d={paths.settings[0]} strokeWidth={2.5} stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
                <Path d={paths.settings[1]} strokeWidth={2.5} stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
        )
    }
    else return null
}