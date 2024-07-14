import React from 'react';
import dynamic from 'next/dynamic';

const IndexChat = dynamic(() => import('@indexnetwork/ui').then(mod => mod.IndexChat), { ssr: false });

function Indexer() {
  return (
    <div className="mt-3">
      <IndexChat sources={["did:pkh:eip155:1:0x1b9Aceb609a62bae0c0a9682A9268138Faff4F5f"]} />
    </div>
  );
}

export default Indexer;
