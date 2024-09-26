// LoginForm
import css from "./LoginForm.module.css"
import { Formik, Form, Field } from 'formik';
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { logIn } from '../../redux/auth/operations';
import { selectIsLoading } from '../../redux/auth/selectors'

export default function LoginForm() {

    const FeedbackSchema = Yup.object().shape({
        name: Yup.string().min(4, "Too Short!").max(50, "Too Long!").required("Required"),
        number: Yup.string().min(4, "Too Short!").max(50, "Too Long!").required('Required')
    });
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsLoading);

    const handleSubmit = (values, actions) => {
        console.log(values);
        dispatch(logIn(values));
        actions.resetForm();
    };
    return (
        <div className={css.item}>
            <Formik initialValues={{
                email: " ",
                password: " "
            }} onSubmit={handleSubmit} validationSchema={FeedbackSchema}>
                <Form autoComplete="off">
                    <div className={css.items}>
                        <label className={css.label}  >Email</label>
                        <Field className={css.inp} type="email" name="email" placeholder="Enter login..." />
                    </div>
                    <div className={css.items}>
                        <label className={css.label} >Password</label>
                        <Field className={css.inp} type="password" name="password" placeholder="Enter text..." />
                    </div>
                    <div className={css.btn}>
                        <button className={css.LoginForm} type="submit" disabled={isLoading}>Log In</button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};
