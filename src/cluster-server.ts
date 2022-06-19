import * as _cluster from 'cluster';
const cluster = _cluster as unknown as _cluster.Cluster;
import { cpus } from 'os';
import { server } from './app';
import 'dotenv/config';

const numCPUs = cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const PORT = process.env.PORT;
  server.listen(PORT, () => {
    console.log(`Server works on port ${PORT}`);
  });

  console.log(`Worker ${process.pid} started`);
}
