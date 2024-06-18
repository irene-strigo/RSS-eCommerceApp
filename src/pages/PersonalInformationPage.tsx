import { Header, Footer } from '../components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { MyCustomerChangePassword, MyCustomerDraft } from '@commercetools/platform-sdk';
import {
  ButtonSubmit,
  Container,
  ContentWrapper,
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
import {
  UpdateCustomerAddressPropertiesAction,
  addCustomerAddress,
  changeCustomerAddress,
  changeCustomerPassword,
  deleteCustomerAddress,
  updateCustomerAddressProperties,
  updateCustomerPersonalData,
} from '../services/Client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const emptyAddress: _BaseAddress = {
  id: '',
  country: '',
  city: '',
  postalCode: '',
  streetName: '',
};

export default function PersonalInformationPage() {
  const authUser = useUser();
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

  const onAddressEditClick = (addressId?: string) => {
    const ea = addressId
      ? authUser?.customer?.addresses.find((a) => a.id === addressId) || emptyAddress
      : emptyAddress;
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

  const showToast = (message: string) => {
    toast.success(message, {
      position: 'top-center',
    });
  };
  const showToastError = (message: string) => {
    toast.error(message, {
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
      showToast('Password changed');
    } catch (err) {
      setRegError('wrong current password');
    }
  };

  const onAddressSubmit: SubmitHandler<_BaseAddress> = async (data) => {
    try {
      if (!authUser.customer?.id) {
        return;
      }

      const isNew = !data.id;

      const customer = isNew
        ? await addCustomerAddress(authUser.customer?.id, data)
        : await changeCustomerAddress(authUser.customer?.id, data);
      authUser.refresh(customer);
      setOpenAddressModal(false);
      const message = isNew ? 'Address added' : 'Address updated';
      showToast(message);
    } catch (err) {
      setRegError('unable to add address');
    }
  };

  const onSubmit: SubmitHandler<MyCustomerDraft> = async (data) => {
    try {
      if (!authUser.customer?.id) {
        return;
      }
      const updatedCustomer = await updateCustomerPersonalData(authUser.customer.id, data);
      authUser.refresh(updatedCustomer);
      setOpenPersonalModal(false);
      showToast('Personal information changed');
    } catch (err) {
      setRegError('impossible update customer');
    }
  };

  async function onAddressPropertyChange(
    addressId: string,
    action: UpdateCustomerAddressPropertiesAction,
    errorMessage = '',
  ) {
    if (!authUser?.customer?.id || !addressId) {
      return;
    }
    try {
      const customerId = authUser.customer.id;
      const customer = await updateCustomerAddressProperties(customerId, addressId, action);
      authUser.refresh(customer);
      showToast('Address property changed');
    } catch (err) {
      console.log(errorMessage);
      showToastError(errorMessage);
    }
  }

  async function onAddressDelete(addressId: string) {
    if (!authUser?.customer?.id || !addressId) {
      return;
    }
    try {
      const customerId = authUser.customer.id;
      const customer = await deleteCustomerAddress(customerId, addressId);
      authUser.refresh(customer);
      showToast('Address removed');
    } catch (err) {
      console.log(err);
      showToast('Impossible to change address, please try later');
    }
  }

  async function onAddressBillingChange(addressId?: string) {
    if (!addressId) {
      return;
    }

    const isRemove = !!authUser.customer?.billingAddressIds?.includes(addressId);

    const action = isRemove ? 'removeBillingAddressId' : 'addBillingAddressId';

    const errorMessage = isRemove
      ? 'failed to remove billing address'
      : 'failed to add billing address';

    return onAddressPropertyChange(addressId, action, errorMessage);
  }

  async function onAddressShippingChange(addressId?: string) {
    if (!addressId) {
      return;
    }

    const isRemove = !!authUser.customer?.shippingAddressIds?.includes(addressId);

    const action = isRemove ? 'removeShippingAddressId' : 'addShippingAddressId';

    const errorMessage = isRemove
      ? 'failed to remove shipping address'
      : 'failed to add shipping address';

    return onAddressPropertyChange(addressId, action, errorMessage);
  }

  async function onAddressDefaultBillingChange(addressId?: string) {
    if (!addressId) {
      return;
    }

    return onAddressPropertyChange(
      addressId,
      'setDefaultBillingAddress',
      'failed to set default billing address',
    );
  }

  async function onAddressDefaultShippingChange(addressId?: string) {
    if (!addressId) {
      return;
    }

    return onAddressPropertyChange(
      addressId,
      'setDefaultShippingAddress',
      'failed to set default shipping address',
    );
  }

  async function onAddressDeleteClick(addressId?: string) {
    if (!addressId) {
      return;
    }
    return onAddressDelete(addressId);
  }

  if (!authUser?.customer) {
    return <></>;
  }

  return (
    <>
      <PageWrapper>
        <Header />
        <ContentWrapper $alignItems={'flex-start'}>
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
                  onClick={(evt) => {
                    evt.preventDefault();
                    setOpenPersonalModal(true);
                  }}
                />
                <ShowButton
                  label={'Change password'}
                  type={'button'}
                  disabled={false}
                  onClick={(evt) => {
                    evt.preventDefault();
                    setOpenPasswordModal(true);
                  }}
                />
              </EditButtonsConainer>
            </div>

            <div>
              <DataList>
                <h5>Addressess:</h5>

                {authUser.customer.addresses.map((adrs) => (
                  <Address
                    key={`address_${adrs.id}`}
                    address={adrs}
                    idx={0}
                    isBilling={
                      authUser.customer?.billingAddressIds?.includes(adrs.id || '') || false
                    }
                    isShipping={
                      authUser.customer?.shippingAddressIds?.includes(adrs.id || '') || false
                    }
                    isDefaultBilling={authUser.customer?.defaultBillingAddressId === adrs.id}
                    isDefaultShipping={authUser.customer?.defaultShippingAddressId === adrs.id}
                    onEditClick={onAddressEditClick}
                    onBillingChange={onAddressBillingChange}
                    onShippingChange={onAddressShippingChange}
                    onDefaultBillingChange={onAddressDefaultBillingChange}
                    onDefaultShippingChange={onAddressDefaultShippingChange}
                    onDeleteClick={onAddressDeleteClick}
                  ></Address>
                ))}
                <SwitchButton onClick={() => onAddressEditClick()}>Add new address</SwitchButton>
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
        </ContentWrapper>
        <Footer />
      </PageWrapper>
    </>
  );
}
