import { useDisclosure, Center } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { Job, User } from 'types';
import Loading from '../components/Loading';
import JobListLoadingState from '../components/Jobs/JobListLoadingState';
import PageWrapper from 'src/components/PageWrapper';
import { getSession } from 'next-auth/react';
import { NextPageContext } from 'next';

const JobListEmptyState = dynamic(() => import('../components/Jobs/JobListEmptyState'), {
  loading: ({ error }) => {
    if (error) {
      return <Loading error={error} />;
    }
    return <JobListLoadingState />;
  },
});

const JobListErrorState = dynamic(() => import('../components/Jobs/JobListErrorState'), {
  loading: ({ error }) => {
    if (error) {
      return <Loading error={error} />;
    }
    return <JobListLoadingState />;
  },
});

const JobForm = dynamic(() => import('../components/JobForm'), {
  loading: ({ error }) => <Loading error={error} />,
});

const JobList = dynamic(() => import('../components/Jobs/JobList'), {
  loading: ({ error }) => {
    if (error) {
      return <Loading error={error} />;
    }
    return <JobListLoadingState />;
  },
});

type Props = {
  user?: User;
};

export default function Jobs({ user }: Props) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isLoading, setIsloading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job>();

  const deleteJob = (jobId: string) => {
    const updatedJobs = jobs.filter(({ _id }) => _id !== jobId);
    setJobs(updatedJobs);
  };

  const updateJobs = (newJob?: Job, op?: string) => {
    if (newJob && op) {
      let updatedJobs: Job[];
      switch (op) {
        case 'append':
          updatedJobs = [...jobs, newJob];
          break;
        case 'update':
          updatedJobs = jobs.map((job) => {
            if (job._id === newJob._id) {
              return newJob;
            }
            return job;
          });
          break;
        default:
          throw new Error(`Op: ${op} is invalid`);
      }
      setJobs(updatedJobs);
      onClose();
    }
  };

  const openJobForm = (id = '') => {
    const job = jobs.find(({ _id }) => _id === id);
    setSelectedJob(job);
    onOpen();
  };

  const fetchJobs = async () => {
    try {
      setIsloading(true);
      const response = await fetch('/api/jobs');
      if (response.ok) {
        const { data } = await response.json();
        setJobs(data);
      } else {
        throw new Error();
      }
    } catch {
      setHasError(true);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  function renderContent() {
    if (isLoading) return <JobListLoadingState />;
    // @ts-ignore
    if (hasError) return <JobListErrorState onRetry={fetchJobs} />;

    return (
      <>
        {jobs.length > 0 ? (
          // @ts-ignore
          <JobList
            defaultTimezone={user?.timezone || ''}
            handleDelete={deleteJob}
            handleUpdate={updateJobs}
            jobs={jobs}
            openJobForm={openJobForm}
          />
        ) : (
          // @ts-ignore
          <JobListEmptyState onClick={openJobForm} />
        )}

        {isOpen && (
          // @ts-ignore
          <JobForm
            defaultTimezone={user?.timezone || ''}
            isOpen={isOpen}
            job={selectedJob}
            onFormClose={onClose}
            onSubmitSuccess={updateJobs}
          />
        )}
      </>
    );
  }

  return (
    <PageWrapper user={user}>
      <Center height="100vh" width="100%">
        {renderContent()}
      </Center>
    </PageWrapper>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);

  if (!session?.user) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return { props: { user: session.user } };
}
