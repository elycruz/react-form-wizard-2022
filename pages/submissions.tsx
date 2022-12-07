import React from "react";
import {FwTable, FwTableColumn} from "../src/components/fw-table";
import {IntakeFormData} from "../src/types";
import {GetServerSideProps, NextPageContext} from "next";
import {withIronSessionSsr} from "iron-session/next";
import {sessionConfig} from "../middleware";
import {CONTACT_INFO_SYMBOL, EMAIL_SYMBOL, PHONE_SYMBOL, USERS_SYMBOL} from "../src/constants";
import {useAppSelector} from "../src/hooks";

export interface SubmissionsPageProps {
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
    name: `${CONTACT_INFO_SYMBOL}.${EMAIL_SYMBOL}`
  }, {
    label: "Phone",
    name: `${CONTACT_INFO_SYMBOL}.${PHONE_SYMBOL}`
  }
];

export default function Submissions() {
  const data = useAppSelector(state => state[USERS_SYMBOL].value)

  console.log('appcontext', data);

  return (<React.Fragment>
    <section>
      <header><h2>Submissions</h2></header>
      <article>
        <FwTable columns={columns} data={data}/>
      </article>
    </section>
  </React.Fragment>)
}

export const getServerSideProps: GetServerSideProps<SubmissionsPageProps> = withIronSessionSsr(
// @ts-ignore
  async ({req: {session}}: NextPageContext): Promise<{ props: SubmissionsPageProps }> => {
    const storeValues = session.intakeEntries;
    let data = !storeValues ? null : storeValues.map(user => user.intakeForm) as unknown as IntakeFormData[];
    console.log(data);
    return {
      props: {data}
    };
  }, sessionConfig);
