import { Grid } from '@mantine/core';
import HatchlessFormInput from "./HatchlessFormInput.jsx";

const HatchlessGridInputs = ({ inputs, form }) => {
  return (
    <Grid>
      {inputs.map((input) => (
        <Grid.Col span={input.span} key={input.name}>
          <HatchlessFormInput form={form} inputConfig={input} />
        </Grid.Col>
      ))}
    </Grid>
  );
}

export default HatchlessGridInputs;