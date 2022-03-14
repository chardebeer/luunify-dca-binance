import {
  Box,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Switch,
  Text,
} from '@chakra-ui/react';
import { diff } from 'deep-object-diff';
import debounce from 'lodash.debounce';
import React, { useRef, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { FaTelegramPlane } from 'react-icons/fa';
import { displayToast, generateSelectOption, getTimezones } from '../client-utils';
import { User } from '../types';
import Overlay from './Overlay';
import Popover from './Popover';
import Select from './Select';

type Props = {
  onClose: () => void;
  initialValues: User;
  isOpen: boolean;
};

export default function Settings({ onClose, initialValues, isOpen }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const loadTimezones = debounce((input, cb) => {
    getTimezones(input).then((timezones) => cb(timezones));
  }, 700);

  const onSubmit = async (values: User) => {
    try {
      setIsLoading(true);
      const payload = diff(initialValues, values);
      const response = await fetch('/api/settings/general', {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...payload, email: initialValues.email }),
      });
      const { message: description } = await response.json();

      if (response.ok) {
        displayToast({
          description: 'Settings updated',
          status: 'success',
          title: 'Success',
        });

        const event = new Event('visibilitychange');
        document.dispatchEvent(event);

        onClose();
      } else {
        setIsLoading(false);
        displayToast({
          description,
          title: 'Error',
        });
      }
    } catch {
      setIsLoading(false);
      displayToast({
        description: 'Something went wrong, please try again.',
        title: 'Error',
      });
    }
  };

  return (
    <Overlay
      isLoading={isLoading}
      isOpen={isOpen}
      formId="settings"
      onClose={() => {
        if (!isLoading) {
          onClose();
        }
      }}
      ref={btnRef}
      subTitle="Edit your global timezone and notification settings here."
      title="Settings"
    >
      <Form
        initialValues={initialValues}
        mutators={{
          enableTelegram([value], state, { changeValue }) {
            changeValue(state, 'telegram.enabled', () => value);
          },
          updateTimezone([value], state, { changeValue }) {
            changeValue(state, 'timezone', () => value);
          },
        }}
        onSubmit={onSubmit}
      >
        {({ form, handleSubmit, pristine, values }) => {
          if (btnRef.current) {
            if (pristine) {
              btnRef.current.disabled = true;
            } else {
              btnRef.current.disabled = false;
            }
          }
          return (
            <form role="form" id="settings" onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <Box>
                  <Field name="timezone">
                    {({ input }) => (
                      <FormControl id="timezone">
                        <FormLabel mb="0">
                          <Stack align="center" isInline spacing={1}>
                            <Text fontSize="17px" fontWeight="bold">
                              Timezone
                            </Text>
                            <Popover title="Default timezone">
                              Unless otherwise specified, this is the timezone used when scheduling your jobs.
                            </Popover>
                          </Stack>
                        </FormLabel>
                        <Select
                          inputId="timezone"
                          isAsync
                          loadOptions={loadTimezones}
                          name={input.name}
                          onChange={({ value }) => form.mutators.updateTimezone(value)}
                          value={generateSelectOption(values.timezone || '')}
                        />
                      </FormControl>
                    )}
                  </Field>
                </Box>
                <Box>
                  <Stack direction={['column', 'row']} spacing={3}>
                    <Field name="telegram.botToken">
                      {({ input }) => (
                        <FormControl id="botToken">
                          <FormLabel aria-label="telegram bot token" mb="0">
                            <Stack align="center" isInline spacing={1}>
                              <Text fontSize="17px" fontWeight="bold">
                                Telegram bot token
                              </Text>
                              <Popover title="Telegram Notifications">
                                Your Telegam bot token is used in tandem with your Telegam chatId to send you updates
                                about your jobs. To learn more about Telegram bots, click{' '}
                                <Link
                                  color="blue.500"
                                  href="https://dev.to/rizkyrajitha/get-notifications-with-telegram-bot-537l"
                                  isExternal
                                >
                                  here
                                </Link>
                              </Popover>
                            </Stack>
                          </FormLabel>
                          <InputGroup>
                            <InputRightElement pointerEvents="none">
                              <Icon as={FaTelegramPlane} boxSize="25px" />
                            </InputRightElement>
                            <Input
                              isDisabled={!values.telegram.enabled}
                              name={input.name}
                              onBlur={input.onBlur}
                              onChange={input.onChange}
                              value={input.value}
                            />
                          </InputGroup>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="telegram.chatId">
                      {({ input }) => (
                        <FormControl id="chatId">
                          <FormLabel aria-label="telegram chat id" mb="0">
                            <Stack align="center" isInline spacing={1}>
                              <Text fontSize="17px" fontWeight="bold">
                                Telegram chatId
                              </Text>
                              <Popover title="Telegram Notifications">
                                Your Telegam chatId is used in tandem with your Telegam bot token to send you updates
                                about your jobs. To learn more about Telegram bots, click{' '}
                                <Link
                                  color="blue.500"
                                  href="https://dev.to/rizkyrajitha/get-notifications-with-telegram-bot-537l"
                                  isExternal
                                >
                                  here
                                </Link>
                              </Popover>
                            </Stack>
                          </FormLabel>
                          <InputGroup>
                            <InputRightElement pointerEvents="none">
                              <Icon as={FaTelegramPlane} boxSize="25px" />
                            </InputRightElement>
                            <Input
                              isDisabled={!values.telegram.enabled}
                              name={input.name}
                              onBlur={input.onBlur}
                              onChange={input.onChange}
                              value={input.value}
                            />
                          </InputGroup>
                        </FormControl>
                      )}
                    </Field>
                  </Stack>
                  <Field name="telegram.enabled">
                    {({ input }) => (
                      <Text color="gray.500" fontSize="sm" mt="0.5rem">
                        Enable Telegram Notifications ?
                        <Switch
                          isChecked={values.telegram.enabled}
                          name={input.name}
                          onChange={({ target }) => form.mutators.enableTelegram(target.checked)}
                        />
                      </Text>
                    )}
                  </Field>
                </Box>
              </Stack>
            </form>
          );
        }}
      </Form>
    </Overlay>
  );
}
