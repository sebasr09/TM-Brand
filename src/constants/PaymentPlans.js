const PaymentPlans = [
  {
    name: 'Digital Checks',
    options: [
      { name: 'Plan de 1.000 consultas', value: 2500000, valuePerRequest: 2500, numberOfRequests: 1000 },
      { name: 'Plan de 3.000 consultas', value: 6675000, valuePerRequest: 2225, numberOfRequests: 3000 },
      { name: 'Plan de 5.000 consultas', value: 9790000, valuePerRequest: 1958, numberOfRequests: 5000 },
      { name: 'Plan de 10.000 consultas', value: 17030000, valuePerRequest: 1703, numberOfRequests: 10000 }
    ]
  },
  {
    name: 'Digital Authentication',
    options: [
      { name: 'Plan de 100 consultas', value: 183600, valuePerRequest: 1836, numberOfRequests: 100 },
      { name: 'Plan de 300 consultas', value: 506736, valuePerRequest: 1689, numberOfRequests: 300 },
      { name: 'Plan de 500 consultas', value: 776995, valuePerRequest: 1554, numberOfRequests: 500 },
      { name: 'Plan de 1.000 consultas', value: 1429571, valuePerRequest: 1430, numberOfRequests: 1000 },
      { name: 'Plan de 3.000 consultas', value: 3945892, valuePerRequest: 1315, numberOfRequests: 3000 },
      { name: 'Plan de 5.000 consultas', value: 6050368, valuePerRequest: 1210, numberOfRequests: 5000 },
      { name: 'Plan de 20.000 consultas', value: 22265356, valuePerRequest: 1113, numberOfRequests: 20000 },
      { name: 'Plan de 50.000 consultas', value: 51210318, valuePerRequest: 1024, numberOfRequests: 50000 },
      { name: 'Plan de 100.000 consultas', value: 94226985, valuePerRequest: 942, numberOfRequests: 100000 }
    ]
  }
];

export default PaymentPlans;
