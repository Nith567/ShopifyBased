import axios from 'axios';

interface DecisionReason {
  decision: string;
  name: string;
  description: string;
}

interface SimulateResponse {
  jsonrpc: string;
  result: {
    transaction:{
    decisionReasons: DecisionReason[];
    };
  };
  id: number;
}

export async function simulateTransaction(address: string): Promise<string | undefined> {;
  const url = `https://rpc.shield3.com/v3/0x2105/${process.env.NEXT_PUBLIC_SHIELD_API}/rpc`;
  const data = {
    jsonrpc: '2.0',
    method: 'eth_simulateTransaction',
    params: [
      '0xf86925808307a12094a0b86991c6218b36c1d19d4a2e9eb0ce3606eb488412f7dabbb844a9059cbb00000000000000000000000073058355084d9e10200d20760379a8bfe2c04a310000000000000000000000000000000000000000000000000000000019548352018080',
      address
    ],
    id: 49
  };

  try {
    const response = await axios.post<SimulateResponse>(url, data);
    const result = response.data.result.transaction;



    if (result && result.decisionReasons) {
      const decisionReasons = result.decisionReasons.slice(1); 

      // Check if every decision reason is "Allow"
      const allAllowed = decisionReasons.every(reason => reason.decision === 'Allow');

      if (allAllowed) {
        console.log('Transaction is allowed.');
        return 'allow';
      } else {
        console.log('Transaction is not allowed due to the following reasons:');
        decisionReasons.forEach(reason => {
          if (reason.decision !== 'Allow') {
            console.log(`${reason.name} - ${reason.description}`);
          }
        });
        return 'not allowed';
      }
    } else {
      console.error('Unexpected response format:', response.data);
      return 'unexpected response format';
    }
  } catch (error) {
    console.error('Error simulating transaction:', error);
    return 'error';
  }
}
