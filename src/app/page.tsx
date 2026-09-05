import { Hero } from '@/components/sections/Hero';
import { Numbers } from '@/components/sections/Numbers';
import { Chapters } from '@/components/sections/Chapters';
import { Frames } from '@/components/sections/Frames';
import { Argument } from '@/components/sections/Argument';
import { TheMoment } from '@/components/sections/TheMoment';
import { Coda } from '@/components/sections/Coda';

export default function Page() {
  return (
    <main id="top">
      <Hero />
      <Numbers />
      <Chapters />
      <Frames />
      <Argument />
      <TheMoment />
      <Coda />
    </main>
  );
}