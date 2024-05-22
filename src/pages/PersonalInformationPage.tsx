import { Header, Footer } from '../components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { MyCustomerDraft } from '@commercetools/platform-sdk';
import { signInCustomer } from '../services/Client';
import { useNavigate } from 'react-router-dom';
import {
  ButtonSubmit,
  Container,
  DataList,
  FieldName,
  Form,
  PageWrapper,
} from '../components/common/CommonStyles';
import { useUser } from '../components/common/AuthContext';
import { useState } from 'react';
//import { Customer } from '@commercetools/platform-sdk';
import { RegistrationData } from '../components/RegistrationData';
import CommentsDiv from '../components/common/CommentsDiv';
import ShowButton from '../components/common/SwitchButton';

export default function PersonalInformationPage() {
  const authUser = useUser();
  const navigate = useNavigate();
  const [regError, setRegError] = useState('');
  const [editMode, setEditMode] = useState(false);

  const processEditMode = () => {
    if (editMode === false) {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<MyCustomerDraft>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<MyCustomerDraft> = async (data) => {
    try {
      const customer = await signInCustomer(data);
      console.log('customer', customer);

      if (customer && customer.id) {
        alert('Account succesfully created');
        await authUser.refresh();
        navigate('/sign-up-shipping-address');
      }
    } catch (err) {
      setRegError('An account with such email already exists, please use another one or log in');
    }
  };

  return (
    <>
      <PageWrapper>
        <Header />
        <Container>
          {editMode === false &&
            !authUser.checkingAuth &&
            authUser.hasAuth &&
            authUser.customer && (
              <DataList>
                <h5>Personal Information</h5>
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
              </DataList>
            )}
          <ShowButton
            label={'Change personal data'}
            type={'button'}
            disabled={false}
            onClick={() => processEditMode()}
          />
          <ShowButton
            label={'Change password'}
            type={'button'}
            disabled={false}
            onClick={() => console.log('password change')}
          />

          {editMode === true && (
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
          )}
        </Container>
        <Footer />
      </PageWrapper>
    </>
  );
}
