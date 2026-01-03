/**
 * Form Components using React Hook Form + DaisyUI
 *
 * Usage:
 * ```tsx
 * import { FormProvider, useForm } from 'react-hook-form';
 * import { FormInput, FormSelect, FormTextarea, FormCheckbox, FormRadioGroup } from '@/components/FormComponents';
 * import { requiredValidation, emailValidation, phoneValidation } from '@/components/FormComponents/validations';
 *
 * const MyForm = () => {
 *   const methods = useForm();
 *
 *   const onSubmit = (data) => console.log(data);
 *
 *   return (
 *     <FormProvider {...methods}>
 *       <form onSubmit={methods.handleSubmit(onSubmit)}>
 *         <FormInput name="email" label="Email" validation={emailValidation()} />
 *         <FormInput name="phone" label="Phone" validation={phoneValidation()} />
 *         <button type="submit" className="btn btn-primary">Submit</button>
 *       </form>
 *     </FormProvider>
 *   );
 * };
 * ```
 */

export { FormInput } from './FormInput';
export { FormTextarea } from './FormTextarea';
export { FormSelect } from './FormSelect';
export { FormCheckbox } from './FormCheckbox';
export { FormRadioGroup } from './FormRadioGroup';

export {
  requiredValidation,
  emailValidation,
  phoneValidation,
  minLengthValidation,
  maxLengthValidation,
  patternValidation,
  minValidation,
  maxValidation,
  combineValidations,
} from './validations';
