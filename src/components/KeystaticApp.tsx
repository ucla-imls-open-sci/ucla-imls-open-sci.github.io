import { Keystatic } from '@keystatic/core/ui';
import config from '../../keystatic.config';

export default function KeystaticApp() {
  return <Keystatic config={config} />;
}
