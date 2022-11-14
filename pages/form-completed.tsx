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
      <button onClick={e => window.location.href = "/"}>Start over</button>
    </div>
  </React.Fragment>)
}
