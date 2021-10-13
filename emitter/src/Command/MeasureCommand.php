<?php

namespace App\Command;

use Datetime;
use App\Service\RandomMeasurementService;
use App\Entity\Measurement;
use App\Repository\MeasurementRepository;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class MeasureCommand extends Command
{
    protected static $defaultName = 'app:measure';

    /** @var MeasurementRepository */
    private $repository;

    /** @var RandomMeasurementService */
    private $service;

    public function __construct(MeasurementRepository $repository, RandomMeasurementService $service)
    {
        $this->repository = $repository;
        $this->service = $service;
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->setDescription('Creates new measurements')
            ->setHelp('This command creates new measurements every 3 seconds. CTRL + C to terminate.')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $output->writeln([
            'Creating measurements every 3 seconds',
            '=====================================',
            '',
            'Press CTRL + c to terminate.'
        ]);

        while (true)
        {
            $measurement = $this->service->createMeasurement();
            $this->repository->save($measurement);
            $output->write('.');
            sleep(3);
        }

        return Command::SUCCESS;
    }
}