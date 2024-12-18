import 'module-alias/register';
import { server } from '@/server';

const port = 3000;

(async () => {
  server.listen(port, () => console.log(`Running on port: ${port}`));
})();
