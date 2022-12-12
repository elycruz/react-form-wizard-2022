import {withIronSessionSsr} from "iron-session/next";
import {sessionConfig} from "../middleware";
import {CONTACT_INFO_SYMBOL, EMAIL_SYMBOL, PHONE_SYMBOL, USERS_SYMBOL} from "../src/constants";
import React, {Suspense} from "react";
import {FwTable, FwTableColumn} from "../src/components/fw-table";
import {IntakeFormData} from "../src/types";
import {GetServerSideProps, NextPageContext} from "next";
import {FormPageProps} from "./[formKey]";
import {getIntakeIndex, useIntakeIndexQuery} from '../src/store-slices/intake-form-slice';
import {AppStore, storeWrapper} from "../src/storeWrapper";

export interface IndexPageProps extends FormPageProps {
  data?: IntakeFormData[],
  isFetching?: boolean
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

export default function IndexPage({data: inData}) {
  const {data = [], isFetching} = useIntakeIndexQuery();
  console.log('inData:', inData);
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

export const getServerSideProps: GetServerSideProps<IndexPageProps> =
  storeWrapper.getServerSideProps((store: AppStore) =>
    withIronSessionSsr(
      // @ts-ignore
      async ({req: {session}}: NextPageContext): Promise<{ props: IndexPageProps }> => {
        const {fieldsetName, user, currIntakeForm: intakeForm} = session;

        await store.dispatch(getIntakeIndex());
        const data = store.getState();

        console.log('store', data?.api?.queries['intakeIndex(undefined)']);

        return {
          props: {
            fieldsetName: fieldsetName ?? CONTACT_INFO_SYMBOL,
            user: user ?? null,
            intakeForm: intakeForm ?? null,
            // data: []
          }
        }
      }, sessionConfig));
