import { HeaderButton } from '../common/HeaderButtons';

function EditProfileHeaderRight(onSubmit: () => void) {
    return <HeaderButton labelText="완료" onPress={onSubmit} />;
}

export default EditProfileHeaderRight;
