import { useDisclosure, Center } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { Job } from 'types';
import Loading from '../Loading';
import JobListLoadingState from './JobListLoadingState';

const JobListEmptyState = dynamic(() => import('./JobListEmptyState'), {
  loading: ({ error }) => {
    if (error) {
      return <Loading error={error} />;
    }
    return <JobListLoadingState />;
  },
});

const JobListErrorState = dynamic(() => import('./JobListErrorState'), {
  loading: ({ error }) => {
    if (error) {
      return <Loading error={error} />;
    }
    return <JobListLoadingState />;
  },
});

const JobForm = dynamic(() => import('../JobForm'), {
  loading: ({ error }) => <Loading error={error} />,
});

const JobList = dynamic(() => import('./JobList'), {
  loading: ({ error }) => {
    if (error) {
      return <Loading error={error} />;
    }
    return <JobListLoadingState />;
  },
});

type Props = {
  defaultTimezone: string;
};

export default function Jobs({ defaultTimezone }: Props) {
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

  if (isLoading) {
    return (
      <Center height="100%" width="100%">
        <JobListLoadingState />
      </Center>
    );
  }

  if (hasError) {
    return (
      <Center height="100%" width="100%">
        {/* @ts-ignore */}
        <JobListErrorState onRetry={fetchJobs} />
      </Center>
    );
  }

  return (
    <Center height="100%" width="100%">
      {jobs.length > 0 ? (
        // @ts-ignore
        <JobList
          defaultTimezone={defaultTimezone}
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
          defaultTimezone={defaultTimezone}
          isOpen={isOpen}
          job={selectedJob}
          onFormClose={onClose}
          onSubmitSuccess={updateJobs}
        />
      )}
    </Center>
  );
}
