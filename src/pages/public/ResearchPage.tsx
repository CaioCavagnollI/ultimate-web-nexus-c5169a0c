import { GraduationCap, BookOpen, FileText, ExternalLink } from "lucide-react";

const papers = [
  { title: "Dose-response relationship between weekly resistance training volume and increases in muscle mass", authors: "Schoenfeld BJ, Ogborn D, Krieger JW", journal: "J Sports Sci, 2017", doi: "10.1080/02640414.2016.1210197", topic: "Volume" },
  { title: "Strength and Hypertrophy Adaptations Between Low- vs. High-Load Resistance Training", authors: "Schoenfeld BJ et al.", journal: "J Strength Cond Res, 2017", doi: "10.1519/JSC.0000000000002200", topic: "Intensidade" },
  { title: "The Effect of Training Volume on Lower-Body Muscle Hypertrophy", authors: "Scarpelli MC et al.", journal: "Sports Med, 2022", doi: "10.1007/s40279-021-01612-z", topic: "Volume" },
  { title: "A Systematic Review of The Effects of Different Resistance Training Volumes", authors: "Baz-Valle E et al.", journal: "J Hum Kinet, 2022", doi: "10.2478/hukin-2022-000x", topic: "Volume" },
  { title: "Effects of Resistance Training Frequency on Measures of Muscle Hypertrophy", authors: "Schoenfeld BJ, Grgic J, Krieger J", journal: "Sports Med, 2019", doi: "10.1007/s40279-018-1030-4", topic: "Frequência" },
  { title: "Rating of perceived exertion as a method of volume autoregulation", authors: "Helms ER et al.", journal: "J Strength Cond Res, 2018", doi: "10.1519/JSC.0000000000002232", topic: "RPE" },
];

export default function ResearchPage() {
  return (
    <div className="space-y-0">
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm mb-6 font-sans">
            <GraduationCap className="h-4 w-4" /> Base Científica
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            Pesquisa & <span className="gold-text">Referências</span>
          </h1>
          <p className="text-xl text-muted-foreground font-sans max-w-3xl mx-auto">
            Literatura peer-reviewed que fundamenta as funcionalidades e recomendações do Nexus.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 bg-card/30">
        <div className="max-w-5xl mx-auto space-y-4">
          {papers.map((p, i) => (
            <div key={i} className="glass-card p-6 hover:border-primary/30 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-sans uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">{p.topic}</span>
                  </div>
                  <h3 className="font-display font-semibold mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground font-sans">{p.authors}</p>
                  <p className="text-xs text-muted-foreground/60 font-sans mt-1">{p.journal}</p>
                </div>
                <a href={`https://doi.org/${p.doi}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors shrink-0">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
