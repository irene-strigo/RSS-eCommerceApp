import { Header, Footer } from '../components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { MyCustomerChangePassword, MyCustomerDraft } from '@commercetools/platform-sdk';
import {
  AddressFieldContainer,
  ButtonSubmit,
  Container,
  DataList,
  EditButtonsConainer,
  FieldName,
  Form,
  PageWrapper,
  SwitchButton,
} from '../components/common/CommonStyles';
import { useUser } from '../components/common/AuthContext';
import { useState } from 'react';
import { RegistrationData } from '../components/RegistrationData';
import CommentsDiv from '../components/common/CommentsDiv';
import ShowButton from '../components/common/SwitchButton';
import Address from '../components/Address';
import { AddressData } from '../components/AddressData';
import { _BaseAddress } from '@commercetools/platform-sdk';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { ChangePasswordData } from '../components/ChangePasswordData';
import { changeCustomerPassword, updateCustomerPersonalData } from '../services/Client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PersonalInformationPage() {
  const authUser = useUser();
  //const navigate = useNavigate();
  const [regError, setRegError] = useState('');
  const [editAddress, setEditAddress] = useState<_BaseAddress>({} as _BaseAddress);

  const [openPersonalModal, setOpenPersonalModal] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const {
    register: addressRegister,
    handleSubmit: addressHandleSubmit,
    getValues: addressGetValues,
    watch: addressWatch,
    reset: addressReset,
    trigger: addressTrigger,
    formState: { errors: addressErrors },
  } = useForm<_BaseAddress>({ mode: 'onChange' });

  const processEditAddressMode = (addressId?: string) => {
    const ea = addressId
      ? authUser?.customer?.addresses.find((a) => a.id === addressId) || ({} as _BaseAddress)
      : ({} as _BaseAddress);
    addressReset();
    setEditAddress({ ...ea });
    setOpenAddressModal(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<MyCustomerDraft>({ mode: 'onChange' });

  const {
    register: passwordRegister,
    handleSubmit: passwordHandleSubmit,
    formState: { errors: passwordErrors },
  } = useForm<MyCustomerChangePassword>({ mode: 'onChange' });
  const changePasswordMessage = () => {
    toast.success('Password was changed', {
      position: 'top-center',
    });
  };
  const changePersonalDataMessage = () => {
    toast.success('Personal Information was changed', {
      position: 'top-center',
    });
  };
  const onPasswordSubmit: SubmitHandler<MyCustomerChangePassword> = async (data) => {
    try {
      if (!authUser.customer?.id) {
        return;
      }

      const changePassword = await changeCustomerPassword(data);
      authUser.refresh(changePassword);
      setOpenPasswordModal(false);
      changePasswordMessage();
    } catch (err) {
      setRegError('wrong current password');
    }
  };

  const onAddressSubmit: SubmitHandler<_BaseAddress> = async () => {};

  const onSubmit: SubmitHandler<MyCustomerDraft> = async (data) => {
    try {
      if (!authUser.customer?.id) {
        return;
      }

      const updatedCustomer = await updateCustomerPersonalData(authUser.customer.id, data);
      authUser.refresh(updatedCustomer);
      setOpenPersonalModal(false);
      changePersonalDataMessage();
    } catch (err) {
      setRegError('impossible update customer');
    }
  };

  return (
    <>
      <PageWrapper>
        <Header />
        <Container>
          <div>
            {!authUser.checkingAuth && authUser.hasAuth && authUser.customer && (
              <DataList>
                <h5>Personal Information:</h5>
                <p>
                  {' '}
                  <FieldName>First Name:</FieldName> {authUser.customer.firstName}
                </p>
                <p>
                  {' '}
                  <FieldName>Last Name:</FieldName> {authUser.customer.lastName}
                </p>
                <p>
                  {' '}
                  <FieldName>Birth Date:</FieldName> {authUser.customer.dateOfBirth}
                </p>
                <p>
                  {' '}
                  <FieldName>Email:</FieldName> {authUser.customer.email}
                </p>
                <ToastContainer />
              </DataList>
            )}
            <Modal open={openPersonalModal} onClose={() => setOpenPersonalModal(false)} center>
              <Form
                onSubmit={handleSubmit(onSubmit)}
                onChange={() => {
                  setRegError('');
                }}
              >
                <Container>
                  <RegistrationData
                    register={register}
                    errors={errors}
                    hidePasswordField={true}
                    firstName={authUser.customer?.firstName}
                    lastName={authUser.customer?.lastName}
                    email={authUser.customer?.email}
                    dateOfBirth={authUser.customer?.dateOfBirth}
                  />
                </Container>
                <CommentsDiv error={regError}></CommentsDiv>
                <ButtonSubmit type={'submit'} disabled={isDirty && !isValid}>
                  Save
                </ButtonSubmit>
              </Form>
            </Modal>
            <Modal
              open={openPasswordModal}
              onClose={() => {
                setOpenPasswordModal(false);
              }}
              center
            >
              <Form
                onSubmit={passwordHandleSubmit(onPasswordSubmit)}
                onChange={() => {
                  setRegError('');
                }}
              >
                <Container>
                  <ChangePasswordData register={passwordRegister} errors={passwordErrors} />
                </Container>
                <CommentsDiv error={regError}></CommentsDiv>
                <ButtonSubmit type={'submit'} disabled={isDirty && !isValid}>
                  Save
                </ButtonSubmit>
              </Form>
            </Modal>

            <EditButtonsConainer>
              <ShowButton
                label={'Change personal data'}
                type={'button'}
                disabled={false}
                onClick={() => setOpenPersonalModal(true)}
              />
              <ShowButton
                label={'Change password'}
                type={'button'}
                disabled={false}
                onClick={() => setOpenPasswordModal(true)}
              />
            </EditButtonsConainer>
          </div>

          <div>
            <DataList>
              <h5>Addressess:</h5>
              {authUser?.customer?.addresses.map((adrs, idx) => (
                <Address
                  key={`address_${adrs.id}`}
                  onClick={() => console.log('action')}
                  label={'label'}
                  type={'checkbox'}
                  disabled={false}
                  onChange={() => console.log('checkbox action')}
                >
                  <AddressFieldContainer>
                    {idx + 1}: {adrs.country} {adrs.city} {adrs.postalCode} {adrs.streetName}
                  </AddressFieldContainer>
                  <ShowButton
                    disabled={false}
                    label={'edit address'}
                    onClick={() => processEditAddressMode(adrs.id)}
                    type={'button'}
                  />
                </Address>
              ))}
              <SwitchButton onClick={() => setOpenAddressModal(true)}>Add new address</SwitchButton>
            </DataList>

            <Modal open={openAddressModal} onClose={() => setOpenAddressModal(false)} center>
              <Form
                onSubmit={addressHandleSubmit(onAddressSubmit)}
                onChange={() => {
                  setRegError('');
                }}
              >
                <Container>
                  <AddressData
                    mode="Edit"
                    register={addressRegister}
                    trigger={addressTrigger}
                    errors={addressErrors}
                    getValues={addressGetValues}
                    watch={addressWatch}
                    hideCheckboxes={true}
                    country={editAddress.country}
                    postalCode={editAddress.postalCode}
                    city={editAddress.city}
                    streetName={editAddress.streetName}
                    id={editAddress.id}
                  />
                </Container>
                <CommentsDiv error={regError}></CommentsDiv>
                <ButtonSubmit type={'submit'} disabled={isDirty && !isValid}>
                  Save
                </ButtonSubmit>
              </Form>
            </Modal>
          </div>
        </Container>

        <Footer />
      </PageWrapper>
    </>
  );
}
