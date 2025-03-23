import { BaseButton, GoogleButton, InvertedButton } from "./button.styles";

export const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted'
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => (
    {
        [BUTTON_TYPE_CLASSES.google]: GoogleButton,
        [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
        [BUTTON_TYPE_CLASSES.base]: BaseButton
    }[buttonType]
    // switch(buttonType){
    //     case 'google':
    //         return GoogleButton;
    //     case 'inverted':
    //         return InvertedButton;
    //     default:
    //         return BaseButton;
    // }
)

const Button = ({children, buttonType, ...otherProps}) => {
    const CustomButton = getButton(buttonType);
    return(
        <CustomButton {...otherProps}>{children}</CustomButton>
    )
}

export default Button;
