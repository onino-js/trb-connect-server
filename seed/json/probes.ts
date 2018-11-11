const NB1 = 40;
const NB2 = 4;

const buildProbe = (name, siteName) => ({
  name: name,
  site: siteName,
  value: Math.round((Math.random() + 0.5) * 10) * 10,
});

const probes = [];

for (let i = 0; i < NB1; i++) {
  probes.push(buildProbe(`TC${i + 1}`, 'Annaba HF2'));
}

for (let i = 0; i < NB2; i++) {
  probes.push(buildProbe(`TC${i + 1}`, 'Apf bouvier'));
}

export default probes;
