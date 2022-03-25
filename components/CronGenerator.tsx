import { Box, Flex, FormLabel, Text } from '@chakra-ui/react';
import cronstrue from 'cronstrue';
import React, { useState, useEffect } from 'react';
import { Field } from 'react-final-form';
import RadioStack from './RadioStack';
import TimePicker from 'react-time-picker/dist/entry.nostyle';

export default function CronGenerator({ onUpdate }: { onUpdate: (value: string) => void }) {
  const [cycle, setCycle] = useState('Daily');
  const [day, setDay] = useState('MON');
  const [time, setTime] = useState('11:00');

  useEffect(() => {
    function createCron() {
      const start = `0 ${time?.split(':')[1] || 0} ${time?.split(':')[0] || 0}`;

      if (cycle === 'Daily') return start + ' * * *';
      if (cycle === 'Weekly') return start + ` * * ${day}`;
      if (cycle === 'Monthly') return start + ` ? * ${day}#1`;
      return start + ` ? ${new Date().getMonth() + 2} ${day}#1`;
    }

    onUpdate(createCron());
  }, [cycle, day, time]);

  return (
    <Field name="schedule">
      {({ input }) => (
        <>
          <Box>
            <FormLabel mt="1px">
              <Text fontSize="17px" fontWeight="bold">
                Recurring Cycle
              </Text>
            </FormLabel>

            <RadioStack name="cycle" options={['Daily', 'Weekly', 'Monthly', 'Yearly']} onChange={setCycle} />
          </Box>

          <Box>
            <FormLabel mt="16px">
              <Text fontSize="17px" fontWeight="bold">
                Repeats On
              </Text>
            </FormLabel>

            <RadioStack
              name="day"
              options={['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']}
              onChange={setDay}
              disabled={cycle === 'Daily'}
            />
          </Box>

          <Flex alignItems="center" my="16px">
            <Text fontSize="17px" fontWeight="bold" my="16px">
              Local Time&nbsp;&nbsp;
            </Text>

            <TimePicker
              onChange={setTime}
              value={time}
              disableClock={true}
              clearIcon={null}
              format="hh:mm a"
              amPmAriaLabel="Select AM/PM"
            />
          </Flex>

          <Text fontSize="14px" textColor="grey.700">
            &nbsp;*&nbsp;{input.value && cronstrue.toString(input.value, { verbose: true })}
          </Text>
        </>
      )}
    </Field>
  );
}
