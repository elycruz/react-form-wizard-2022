import {withIronSessionSsr} from "iron-session/next";
import {sessionConfig} from "../middleware";
import {useAppSelector} from "../src/hooks";
import {CONTACT_INFO_SYMBOL, EMAIL_SYMBOL, PHONE_SYMBOL, USERS_SYMBOL} from "../src/constants";
import React, {Suspense} from "react";
import {FwTable, FwTableColumn} from "../src/components/fw-table";
import {IntakeFormData} from "../src/types";
import {GetServerSideProps, NextPageContext} from "next";
import {FormPageProps} from "./[formKey]";
import {useIntakeIndexQuery} from '../src/store-slices/intake-form-slice';

export interface IndexPageProps extends FormPageProps {
  data?: IntakeFormData[]
}

/**
 * Submissions table column configs.
 */
const columns: FwTableColumn<IntakeFormData>[] = [
  {
    label: "No.",
    name: null,
    indexColumn: true,
    indexColumnOffset: 0
  }, {
    label: "Email",
    name: `value.${CONTACT_INFO_SYMBOL}.${EMAIL_SYMBOL}`
  }, {
    label: "Phone",
    name: `value.${CONTACT_INFO_SYMBOL}.${PHONE_SYMBOL}`
  }
];

export default function IndexPage() {
  const {data = [], isFetching} = useIntakeIndexQuery();

  console.log('intakeEntries: ', data);

  return (<React.Fragment>
    <section>
      <form action="/api/intake-form" method="post">
        <fieldset>
          <button>New Submission</button>
        </fieldset>
      </form>
    </section>
    <section>
      <header><h2>Submissions</h2></header>
      <article>
        {isFetching ? (<p>Loading ...</p>) :
          (<FwTable columns={columns} data={data}/>)
        }
      </article>
    </section>
  </React.Fragment>);
}

export const getServerSideProps: GetServerSideProps<IndexPageProps> = withIronSessionSsr(
// @ts-ignore
  async ({req: {session}}: NextPageContext): Promise<{ props: IndexPageProps }> => {
    const {fieldsetName, user, currIntakeForm: intakeForm} = session;

    return {
      props: {
        fieldsetName: fieldsetName ?? CONTACT_INFO_SYMBOL,
        user: user ?? null,
        intakeForm: intakeForm ?? null
      }
    }
  }, sessionConfig);
