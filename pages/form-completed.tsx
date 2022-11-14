import * as React from 'react';

export default function FormCompleted() {
  return (<React.Fragment>
    <div>
      <p>Form completed successfully.</p>
      <p>Data submitted:</p>
      <section>
        <article>
        </article>
      </section>
      <form action="/api/intake-form" method="post">
        <button>Start over</button>
      </form>
    </div>
  </React.Fragment>)
}
