import showToastError from "../../services/toastService";
import { useId } from "react";
import { Formik, Form, Field } from "formik";
import type { FormikHelpers } from "formik";
// import * as Yup from "yup";
import styles from "./SearchBar.module.css";

interface SearchFormValues {
  query: string;
}

const initialValues: SearchFormValues = {
  query: "",
};

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const fieldId = useId();

  const handleSubmit = (
    values: SearchFormValues,
    actions: FormikHelpers<SearchFormValues>
  ) => {
    const query = values.query as string;
    if (query === "") {
      showToastError("Please enter your search query.");
      return;
    }
    onSubmit(query);
    actions.resetForm();
  };

  // function handleSubmit(formData: FormData) {
  //   const query = formData.get("query") as string;
  //   if (query === "") {
  //     showToastError("Please enter your search query.");
  //     return;
  //   }

  //   onSubmit(query);
  // }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB{" "}
        </a>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form className={styles.form}>
            <Field
              type="text"
              name="query"
              id={`${fieldId}-query`}
              className={styles.input}
            />
            <button type="submit" className={styles.button}>
              Search
            </button>
          </Form>
        </Formik>
      </div>
    </header>
  );
}
