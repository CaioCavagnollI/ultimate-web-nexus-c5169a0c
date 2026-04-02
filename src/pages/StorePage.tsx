import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { ShoppingBag, Package, Star, Upload, Loader2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useStoreProducts, useCreateProduct, useApproveProduct, usePurchaseProduct } from "@/hooks/useStore";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Product = Tables<"store_products">;

export default function StorePage() {
  const { user } = useAuth();
  const { tier } = useSubscription();
  const { data: products, isLoading } = useStoreProducts("approved");
  const createProduct = useCreateProduct();
  const approveProduct = useApproveProduct();
  const purchaseProduct = usePurchaseProduct();
  const isAdmin = tier === "admin";

  const [showSubmit, setShowSubmit] = useState(false);
  const [submitForm, setSubmitForm] = useState({ title: "", description: "", type: "ebook", price: "" });
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploading(true);
    try {
      const path = `store/${user.id}/${Date.now()}_${file.name}`;
      const { error } = await supabase.storage.from("uploads").upload(path, file);
      if (error) throw error;
      const { data: urlData } = supabase.storage.from("uploads").getPublicUrl(path);
      setFileUrl(urlData.publicUrl);
      toast.success("Arquivo enviado");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Erro no upload");
    }
    setUploading(false);
  };

  const handleSubmit = async () => {
    if (!submitForm.title || !submitForm.price) {
      toast.error("Preencha título e preço");
      return;
    }
    try {
      await createProduct.mutateAsync({
        title: submitForm.title,
        description: submitForm.description,
        type: submitForm.type,
        price: parseFloat(submitForm.price),
        file_url: fileUrl,
      });
      setShowSubmit(false);
      setSubmitForm({ title: "", description: "", type: "ebook", price: "" });
      setFileUrl(null);
    } catch { /* handled by hook */ }
  };

  const handlePurchase = async (product: Product) => {
    try {
      await purchaseProduct.mutateAsync({ productId: product.id, price: product.price });
    } catch { /* handled by hook */ }
  };

  return (
    <PageShell icon={ShoppingBag} title="Atlas Store" description="E-books, cursos, programas, templates e materiais científicos">
      {/* Submit Product */}
      <div className="glass-card p-5 flex items-center justify-between">
        <div>
          <h3 className="font-display font-semibold">Publicar seu Produto</h3>
          <p className="text-sm text-muted-foreground font-sans">Comissão: 80% para você, 20% Nexus.</p>
        </div>
        <Dialog open={showSubmit} onOpenChange={setShowSubmit}>
          <DialogTrigger asChild>
            <Button variant="hero-outline" className="gap-2"><Upload className="h-4 w-4" /> Submeter</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Submeter Produto</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Título do produto" value={submitForm.title} onChange={(e) => setSubmitForm((s) => ({ ...s, title: e.target.value }))} />
              <Textarea placeholder="Descrição" value={submitForm.description} onChange={(e) => setSubmitForm((s) => ({ ...s, description: e.target.value }))} />
              <Select value={submitForm.type} onValueChange={(v) => setSubmitForm((s) => ({ ...s, type: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ebook">E-book</SelectItem>
                  <SelectItem value="course">Curso</SelectItem>
                  <SelectItem value="program">Programa</SelectItem>
                  <SelectItem value="template">Template</SelectItem>
                  <SelectItem value="audiobook">Audiobook</SelectItem>
                  <SelectItem value="article">Artigo Científico</SelectItem>
                </SelectContent>
              </Select>
              <Input type="number" placeholder="Preço (R$)" value={submitForm.price} onChange={(e) => setSubmitForm((s) => ({ ...s, price: e.target.value }))} />
              <div>
                <label className="text-sm font-sans text-muted-foreground block mb-1">Arquivo (PDF, MP3)</label>
                <Input type="file" accept=".pdf,.mp3,.mp4" onChange={handleFileUpload} disabled={uploading} />
                {uploading && <Loader2 className="h-4 w-4 animate-spin mt-2 text-primary" />}
                {fileUrl && <p className="text-xs text-primary mt-1">✓ Arquivo enviado</p>}
              </div>
              <Button variant="hero" className="w-full" onClick={handleSubmit} disabled={createProduct.isPending}>
                {createProduct.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Enviar para Aprovação"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Products Grid */}
      <h2 className="font-display font-semibold text-lg mt-6">Catálogo</h2>
      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : !products?.length ? (
        <div className="glass-card p-8 text-center text-muted-foreground font-sans">
          <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-40" />
          <p>Nenhum produto disponível ainda. Seja o primeiro a publicar!</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p.id} className="glass-card-hover p-5">
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20 font-sans">{p.type}</span>
              <h3 className="font-display font-semibold mt-3 mb-1">{p.title}</h3>
              <p className="text-sm text-muted-foreground font-sans mb-4 line-clamp-2">{p.description || "Conteúdo baseado em evidência científica."}</p>
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-primary">R$ {Number(p.price).toFixed(2)}</span>
                <Button variant="hero" size="sm" onClick={() => handlePurchase(p)} disabled={purchaseProduct.isPending}>
                  Comprar
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageShell>
  );
}
