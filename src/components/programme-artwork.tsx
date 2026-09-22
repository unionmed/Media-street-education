import { BrainCircuit, ChartNoAxesCombined, AudioLines, MoveUpRight } from 'lucide-react';
import type { Category } from '@/lib/types';

export function ProgrammeArtwork({ category }: { category: Category }) {
  const Icon = {
    ai: BrainCircuit,
    marketing: AudioLines,
    data: ChartNoAxesCombined,
    leadership: MoveUpRight,
  }[category];
  return (
    <div className={`programme-artwork art-${category}`} aria-hidden="true">
      <div className="art-grid" />
      <div className="art-orbit art-orbit-one" />
      <div className="art-orbit art-orbit-two" />
      <div className="art-orbit art-orbit-three" />
      <Icon size={45} strokeWidth={1} />
      <span className="art-corner">MW / {category.toUpperCase()}</span>
      <span className="art-plus">+</span>
    </div>
  );
}
